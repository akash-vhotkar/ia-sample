const jwt = require('jsonwebtoken');
const { handler } = require('./handler');
const generateAuthToken = (data) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data
    }, process.env.JWT_SECRET);
}


const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return handler(res, { code: 401, type: "UNAUTHORIZED_ACCESS", message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.local = decoded.data;
        next();
    } catch (error) {
        return handler(res, { code: 500 }, error);
    }
};


module.exports = { generateAuthToken, authMiddleware }