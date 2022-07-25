import {apiHandler} from '../../../helpers/api';
import UserHandler from '../../../helpers/auth/user-handler';
import { PrismaClient } from "@prisma/client";

export default apiHandler(handler);

async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return todos();
        default:
            return res.status(405).end(`Method  Not Allowed`)
    }

    async function todos(){

        const userId = UserHandler(req.headers.authorization);

        const prisma = new PrismaClient();

        const todos = await prisma.todo.findMany({
            where: {
                user: {
                    id: userId
                }
            }
        })

        res.status(200).json({
            message: todos
        });
    }
}
