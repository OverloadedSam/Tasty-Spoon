const User = require("../models/user");
const { userValidator } = require("../helpers/dataValidation");
const { userDataUpdateValidator } = require("../helpers/updatedDataValidation");
const ErrorResponse = require("../utils/errorResponse");

// Get all users from the DB [READ].
const getUsers = async (req, res, next) => {
    try {
        var response = await User.find(); // Read users asynchronously.
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        // return res.status(400).json({ error });
        return next(error);
    }

    // Return the user list in response
    return res.status(200).json({
        success: true,
        status: 200,
        data: response,
    });
};

// Get single user from the DB by specifying "_id" [READ] .
const getUserById = async (req, res, next) => {
    try {
        var response = await User.findById(req.params.id); // Read user asynchronously.
        if (!response)
            return next(
                new ErrorResponse(
                    `Id ${req.params.id} did not found! Please provide correct id.`,
                    404
                )
            );
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        return next(error);
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
const postUser = async (req, res, next) => {
    const { value, error } = userValidator(req.body); // Validate the user data.

    // If data is invalid then return ValidationError in response.
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct information! ${error.details[0].message}`,
                406
            )
        );
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
        var response = await user.save(); // Read users asynchronously.
    } catch (error) {
        console.log("Some error ocurred while saving the user to the db");
        console.log(error);
        return next(error);
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
const putUserById = async (req, res, next) => {
    let dataToBeUpdated = req.body;

    // Updated data validation for User, returns error if invalid.
    const { error } = userDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct details ${error.details[0].message}`,
                406
            )
        );
    }

    try {
        // Finds email whether it exists in DB.
        if (dataToBeUpdated.email) {
            const emailFound = await User.findOne({
                email: dataToBeUpdated.email,
            });
            if (emailFound && emailFound._id == req.params.id) {
                return next(
                    new ErrorResponse("Please provide new e-mail address", 406)
                );
            }
            if (emailFound && emailFound._id != req.params.id) {
                return next(
                    new ErrorResponse(
                        `E-mail ${emailFound.email} has been already registered with other account`,
                        400
                    )
                );
            }
        }
        // Finds phone whether it exists in DB.
        if (dataToBeUpdated.phone) {
            const phoneFound = await User.findOne({
                phone: dataToBeUpdated.phone,
            });
            if (phoneFound && phoneFound._id == req.params.id) {
                return next(
                    new ErrorResponse("Please provide new phone number", 406)
                );
            }
            if (phoneFound && phoneFound._id != req.params.id) {
                return next(
                    new ErrorResponse(
                        `Phone ${phoneFound.phone} has been already registered with other account`,
                        400
                    )
                );
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
        if (!isUpdate) {
            return next(
                new ErrorResponse(
                    `Id ${req.params.id} did not found! Please provide correct id.`,
                    400
                )
            );
        }
        return res.status(200).json({
            message: "Successfully updated the data",
            updatedData: { ...dataToBeUpdated },
        });
    } catch (error) {
        console.log("Some error ocurred!");
        console.log(error);
        return next(error);
    }
};
module.exports = { getUsers, postUser, getUserById, putUserById };
