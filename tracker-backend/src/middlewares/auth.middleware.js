const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // This contains the 'id' field as signed in auth controller
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
