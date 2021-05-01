const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ResponseError = require("../utils/errorResponse");

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
        return next(
            new ResponseError(
                "No authorization token was found in the request header!",
                401
            )
        );
    }

    try {
        const payload = await jwt.verify(token, process.env.SECRET); // Check if the token is valid or not.

        const user = await User.findById(payload.userId); // If valid token then search the user in db.

        if (!user) {
            return next(
                new ResponseError("User not found with the given token!", 401)
            );
        }

        req.user = user;

        next();
    } catch (error) {
        return next(error);
    }
};

// Check if the user is admin or not.
const admin = (req, res, next) => {
    if (req.user && req.user.privileges > 0) {
        next();
    } else {
        return next(
            new ResponseError("You have no authority for this route!", 401)
        );
    }
};

module.exports = { protect, admin };
