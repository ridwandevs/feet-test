import {apiHandler} from '../../../../helpers/api';
import UserHandler from '../../../../helpers/auth/user-handler';
import { PrismaClient } from "@prisma/client";

export default apiHandler(handler);

async function handler(req, res) {

    switch (req.method) {
        case 'PUT':
            return updateTodo();
        default:
            return res.status(405).end(`Method  Not Allowed`)
    }

    async function updateTodo(){

        const { todoId } = req.query;
        const { title, description, completed } = req.body;

        const userId = UserHandler(req.headers.authorization);

        const prisma = new PrismaClient();

        const todo = await prisma.Todo.update({
            where: {
                id: todoId,
            },
            data: {
                title: title,
                description: description,
                completed: completed
            }
        })

        res.status(200).json({
            message: todo
        });
    }
}
