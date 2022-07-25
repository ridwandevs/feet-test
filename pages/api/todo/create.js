import {apiHandler} from '../../../helpers/api';
import UserHandler from '../../../helpers/auth/user-handler';
import { PrismaClient } from "@prisma/client";

export default apiHandler(handler);

async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            return createTodo();
        default:
            return res.status(405).end(`Method  Not Allowed`)
    }

    async function createTodo(){

        const { title, description } = req.body;

        //validate request for title and description

        if (!title) {
            res.status(400).json({
                error: "Title are required"
            });
        }

        const userId = UserHandler(req.headers.authorization);

        const prisma = new PrismaClient();

        const todos = await prisma.todo.create({
            data: {
                title: title,
                user: {
                    connect: {
                        id: userId
                    }
                },
                completed: false,
                description: description
            }
        });

        res.status(200).json({
            message: todos
        });
    }
}
