import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');

import {apiHandler} from '../../../helpers/api';

export default apiHandler(handler);

async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            return register();
        default:
            return res.status(405).end(`Method  Not Allowed`)
    }

    async function register() {
        const { email, password, name } = req.body;

        const prisma = new PrismaClient();

        //validate request for email, password and name
        if (!email || !password || !name) {

            res.status(400).json({
                error: "Email, password and name are required"
            });

            return;
        }

        //checking user is already registered
        const register = await prisma.user.findUnique({
            where: {
                email: email

            }
        });

        if (register) {
            res.status(400).json({
                error: "User already registered"
            });

            return;
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const User = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name
            }
        });

        res.status(201).json({
            message: 'Registeration successful',
        });
    }


}
  