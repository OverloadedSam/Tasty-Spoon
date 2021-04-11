const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { userValidator } = require("../helpers/dataValidation");

// Register the user [CREATE]
const registerUser = async (req, res) => {
    const { value, error } = userValidator(req.body); // Validate the user data.
    // If invalid data then send error in response.
    if (error) {
        return res.status(406).json({
            message: "ValidationError",
            error: error.details[0].message,
        });
    }

    // Make an object to create an user in DB
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: bcryptjs.hashSync(
            req.body.password,
            Number(process.env.SALT)
        ),
        address: req.body.address,
        phone: req.body.phone,
        privileges: req.body.privileges,
    });

    try {
        var response = await user.save(); // Create user asynchronously.
    } catch (error) {
        console.log("Some error ocurred while saving the user to the db");
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Can not create user to the DB",
            error,
        });
    }

    const { firstName, lastName, email, phone } = response; // send only general data don[t send passwords.

    // Send success in response.
    return res.status(201).json({
        status: 201,
        message: "User has been created in the DB",
        firstName,
        lastName,
        email,
        phone,
    });
};

module.exports = { registerUser };
