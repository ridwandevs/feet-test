
const jwt = require('jsonwebtoken');

export default UserHandler;

function UserHandler(data) {

    const token = data.replace(/Bearer\s/, '');

    // const prisma = new PrismaClient();

    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return {    error: 'Invalid token' };
        }

        return decoded.id;
    });




    return decoded;
    
}