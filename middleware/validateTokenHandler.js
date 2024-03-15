const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "User is not authorized" }); // Send 401 response if JWT verification fails
            } else {
                req.user = decoded.user; // Store decoded user information in the request object
                next(); // Call next to continue processing subsequent middleware or route handler
            }
        });
    } else {
        res.status(401).json({ error: "User is not authorized or token is missing" }); // Send 401 response if token is missing or invalid
    }
});

module.exports = validateToken;
