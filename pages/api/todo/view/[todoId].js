import {apiHandler} from '../../../../helpers/api';
import UserHandler from '../../../../helpers/auth/user-handler';
import { PrismaClient } from "@prisma/client";

export default apiHandler(handler);

async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return updateTodo();
        default:
            return res.status(405).end(`Method  Not Allowed`)
    }

    async function updateTodo(){

        const { todoId } = req.query;

        const userId = UserHandler(req.headers.authorization);

        const prisma = new PrismaClient();

        const todo = await prisma.Todo.findUnique({
            where: {
                id: todoId,
            }
        })

        res.status(200).json({
            message: todo
        });
    }
}
