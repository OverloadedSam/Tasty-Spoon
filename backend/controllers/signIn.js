const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const sendTokenToUser = require("../utils/sendTokenToUser");

// For user login or sign-in
const userSignIn = async (req, res, next) => {
    const { email, password } = req.body;

    // Returns false in success if email or password is not int he request body.
    if (!email || !password) {
        next(new ErrorResponse("Please provide both email and password", 400));
    }

    try {
        const userFound = await User.findOne({ email }); // Find the email in the DB asynchronously.

        // Returns false if provided email is not found.
        if (!userFound) {
            return next(
                new ErrorResponse("Email/Username does not exist", 404)
            );
        }

        // Matches the provided password with the original password associated with email.
        if (await userFound.matchPassword(password)) {
            sendTokenToUser(res, 200, userFound);
        } else {
            // Returns false if the password does not matches.
            return next(
                new ErrorResponse(
                    "Incorrect password! Please input the correct password",
                    403
                )
            );
        }
    } catch (error) {
        // Catches errors in case something went wrong.
        console.log("Something went wrong while signing in!");
        console.log(error);
        return next(error);
    }
};

module.exports = { userSignIn };
