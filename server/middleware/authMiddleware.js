const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ msg: "Malformed token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
