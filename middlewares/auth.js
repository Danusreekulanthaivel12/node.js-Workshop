const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).send({ message: 'No token provided' });
    } else {
        console.log(authHeader);
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(403).send({ message: 'Invalid token' });
            } else {
                console.log('User authenticated');
                next();
            }
        });
    }
}

module.exports = { verifyToken }; 