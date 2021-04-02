const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { userValidator } = require("../helpers/dataValidation");

// Get all users from the DB [READ].
const getUsers = async (req, res) => {
    try {
        var response = await User.find(); // Read users asynchronously.
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        return res.status(400).json({ error });
    }

    // Return the user list in response
    return res.status(200).json({
        success: true,
        status: 200,
        data: response,
    });
};

// Get single user from the DB by specifying "_id" [READ] .
const getUserById = async (req, res) => {
    try {
        var response = await User.findById(req.params.id); // Read user asynchronously.
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        return res.status(400).json({ error });
    }

    const {
        _id,
        firstName,
        address,
        phone,
        email,
        privileges,
        createdAt,
        updatedAt,
    } = response;
    // Return the user in response (If found).
    return res.status(200).json({
        success: true,
        status: 200,
        data: {
            _id,
            firstName,
            address,
            phone,
            email,
            privileges,
            createdAt,
            updatedAt,
        },
    });
};

// Post user to the DB [CREATE].
const postUser = async (req, res) => {
    const { value, error } = userValidator(req.body); // Validate the user data.

    // If data is invalid then return ValidationError in response.
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
        var response = await user.save(); // Read users asynchronously.
    } catch (error) {
        console.log("Some error ocurred while saving the user to the db");
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Can not create user to the DB",
            error,
        });
    }

    const { firstName, lastName, email, phone } = response;

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

// Put/Update user in DB by specifying an id.
const putUserById = async (req, res) => {
    let dataToBeUpdated = req.body;
    try {
        const isUpdate = await User.findByIdAndUpdate(
            req.params.id,
            dataToBeUpdated,
            {
                new: true,
                useFindAndModify: false,
            }
        );
        if (isUpdate)
            return res.status(200).json({
                message: "Successfully updated the data",
                updatedData: { ...dataToBeUpdated },
            });
    } catch (error) {
        console.log("Some error ocurred!");
        console.log(error);
    }
};
module.exports = { getUsers, postUser, getUserById, putUserById };
