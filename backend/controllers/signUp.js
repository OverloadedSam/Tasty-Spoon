const User = require("../models/user");
const { userValidator } = require("../helpers/dataValidation");

// Register the user [CREATE]
const registerUser = async (req, res) => {
    const { value, error } = userValidator(req.body); // Validate the user data.
    // If invalid data then send error in response.
    if (error) {
        return res.status(406).json({
            error: {
                type: "ValidationError",
            },
            message: error.details[0].message,
            error: error.details[0].message,
        });
    }

    try {
        // Check if the email or phone already exist.
        const emailFound = await User.findOne({
            email: req.body.email,
        });
        const phoneFound = await User.findOne({
            phone: req.body.phone,
        });
        if (emailFound || phoneFound) {
            return res.status(406).json({
                status: 406,
                error: {
                    type: "ValidationError",
                },
                message: `${emailFound ? "E-mail" : "Phone"} ${
                    emailFound ? emailFound.email : phoneFound.phone
                } has been already registered with another account`,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: `Can not register you due to some technical issues`,
            error,
        });
    }

    // Make an object to create an user in DB
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        privileges: req.body.privileges,
    });

    try {
        var response = await user.save(); // Create user asynchronously.
    } catch (error) {
        console.log("Some error ocurred while saving the user to the db");
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Can not create user to the DB",
            error,
        });
    }

    const { firstName, lastName, email, phone } = response; // send only general data don't send passwords.

    // Send success in response.
    return res.status(201).json({
        success: true,
        status: 201,
        message: "User has been created in the DB",
        firstName,
        lastName,
        email,
        phone,
    });
};

module.exports = { registerUser };
