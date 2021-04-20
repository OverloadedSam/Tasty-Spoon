const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// For user login or sign-in
const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    // Returns false in success if email or password is not int he request body.
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide both email and password",
        });
    }

    try {
        const userFound = await User.findOne({ email }); // Find the email in the DB asynchronously.

        // Returns false if provided email is not found.
        if (!userFound) {
            return res.status(404).json({
                success: false,
                message: "Email/Username does not exist",
            });
        }

        // Matches the provided password with the original password associated with email.
        if (
            userFound &&
            bcryptjs.compareSync(password, userFound.passwordHash)
        ) {
            // Sign/make a json web token for authentication to send it in response.
            const token = jwt.sign(
                {
                    userId: userFound._id,
                    email,
                    logNo: userFound.privileges,
                },
                process.env.SECRET,
                {
                    expiresIn: "1d",
                }
            );
            // Returns the token in response.
            return res.status(200).header("auth-user", token).json({
                success: true,
                message: "Logged in successfully!",
                userId: userFound._id,
                userEmail: userFound.email,
                userFirstName: userFound.firstName,
                userLastName: userFound.lastName,
                token,
            });
        } else {
            // Returns false if the password does not matches.
            return res.status(400).json({
                success: false,
                message:
                    "Incorrect password! Please input the correct password",
            });
        }
    } catch (error) {
        // Catches errors in case something went wrong.
        console.log("Something went wrong while signing in!");
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while signing in. Please contact admin and report this issue.",
        });
    }
};

module.exports = { userSignIn };
