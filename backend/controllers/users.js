const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { userValidator } = require("../helpers/dataValidation");
const { userDataUpdateValidator } = require("../helpers/updatedDataValidation");

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

    // Updated data validation for User, returns error if invalid.
    const { error } = userDataUpdateValidator(req.body);
    if (error) {
        return res.status(400).json({
            message: "Please provide correct details",
            error,
        });
    }

    try {
        // Finds email whether it exists in DB.
        if (dataToBeUpdated.email) {
            const emailFound = await User.findOne({
                email: dataToBeUpdated.email,
            });
            if (emailFound && emailFound._id == req.params.id) {
                return res.status(400).json({
                    message: "Please provide new e-mail address",
                });
            }
            if (emailFound && emailFound._id != req.params.id) {
                return res.status(400).json({
                    message: `E-mail ${emailFound.email} has been already registered with other account`,
                });
            }
        }
        // Finds phone whether it exists in DB.
        if (dataToBeUpdated.phone) {
            const phoneFound = await User.findOne({
                phone: dataToBeUpdated.phone,
            });
            if (phoneFound && phoneFound._id == req.params.id) {
                return res.status(400).json({
                    message: "Please provide new phone number",
                });
            }
            if (phoneFound && phoneFound._id != req.params.id) {
                return res.status(400).json({
                    message: `Phone ${phoneFound.phone} has been already registered with other account`,
                });
            }
        }

        // Asynchronously updates the only data that is coming in request.
        const isUpdate = await User.findByIdAndUpdate(
            req.params.id,
            dataToBeUpdated,
            {
                new: true,
                useFindAndModify: false,
            }
        );

        // Send success in response.
        if (isUpdate)
            return res.status(200).json({
                message: "Successfully updated the data",
                updatedData: { ...dataToBeUpdated },
            });
    } catch (error) {
        console.log("Some error ocurred!");
        console.log(error);
        return res.status(500).json({
            message:
                "Some error ocurred while processing your request please provide correct details",
            error,
        });
    }
};
module.exports = { getUsers, postUser, getUserById, putUserById };
