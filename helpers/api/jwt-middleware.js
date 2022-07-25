const { expressjwt: expressJwt } = require('express-jwt');
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/login',
            '/api/auth/register',
        ]
    });

    return util.promisify(middleware)(req, res);
}