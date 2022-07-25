import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import {apiHandler} from '../../../helpers/api';

export default apiHandler(handler);

async function handler(req, res) {

        switch (req.method) {
            case 'POST':
                return login();
            default:
                return res.status(405).end(`Method  Not Allowed`)
        }

        //login function
        async function login() {
            const { email, password } = req.body;

            const prisma = new PrismaClient();

            const User = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!User) {
                res.status(400).json({
                    error: "User not found"
                });
            }

            const isMatch = await bcrypt.compare(password, User.password);

            if (!isMatch) {
                res.status(400).json({
                    error: "Incorrect password"
                });
            }

            const token = await prisma.UserToken.create({
                data: {
                    user: {
                        connect: {
                            id: User.id
                        }
                    },
                    token: jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
                }
            });

            res.status(200).json({
                message: token
            })
    }

}