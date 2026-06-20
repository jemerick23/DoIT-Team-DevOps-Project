const jwt = require("jsonwebtoken");
require("dotenv").config();

//Authenticate user
function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: "No token provided."});
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid authorization format." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
        catch {res.status(403).json({ message: "Invalid or expired token." });
    }
}

//Authorize roles
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role_id)) {
            return res.status(403).json({ message: "Access denied." });
        }
        next();
    };
}

module.exports = {
    authenticateUser,
    authorizeRoles
};