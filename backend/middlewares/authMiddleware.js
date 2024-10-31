const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(403).send('Token is required!');
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token!');
        }
        req.userId = decoded.userId; // Save userId from token to request for future use
        next();
    });
};

module.exports = verifyToken;
