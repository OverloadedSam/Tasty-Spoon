const User = require("../models/user");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    // When user is logged in.
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "No authorization token was found in the request header!",
        });
    }

    try {
        const payload = await jwt.verify(token, process.env.SECRET); // Check if the token is valid or not.

        const user = await User.findById(payload.userId); // If valid token then search the user in db.

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with the given token",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: error.message,
            error,
        });
    }
};

// Check if the user is admin or not.
const admin = (req, res, next) => {
    if (req.user && req.user.privileges > 0) {
        next();
    } else {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "You have no authority for this route!",
        });
    }
};

module.exports = { protect, admin };
