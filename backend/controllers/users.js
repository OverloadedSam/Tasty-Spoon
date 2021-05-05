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
        return next(error);
    }

    // Return the user list in response
    return res.status(200).json({
        success: true,
        status: 200,
        data: response,
    });
};

// Get single user from the DB (Own profile) [READ] .
const getMyProfile = async (req, res, next) => {
    try {
        const user = { ...req.user._doc };
        delete user["passwordHash"];
        delete user["privileges"];
        delete user["createdAt"];
        delete user["updatedAt"];
        delete user["__v"];

        return res.status(200).json({
            success: true,
            status: 200,
            data: user,
        });
    } catch (error) {
        return next(error);
    }
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

// Put/Update user in DB by (Update own profile).
const updateMyProfile = async (req, res, next) => {
    let data = { ...req.body };

    // Updated data validation for User, returns error if invalid.
    const { error } = userDataUpdateValidator(data);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct details ${error.details[0].message}`,
                406
            )
        );
    }
    if (data.password) {
        data.passwordHash = data.password;
        delete data.password;
    }

    try {
        // Finds email whether it exists in DB.
        if (data.email) {
            const emailFound = await User.findOne({
                email: data.email,
            });

            if (emailFound && !emailFound._id.equals(req.user._doc._id)) {
                return next(
                    new ErrorResponse(
                        `E-mail ${emailFound.email} has been already registered with other account`,
                        400
                    )
                );
            }
        }
        // Finds phone whether it exists in DB.
        if (data.phone) {
            const phoneFound = await User.findOne({
                phone: data.phone,
            });

            if (phoneFound && !phoneFound._id.equals(req.user._doc._id)) {
                return next(
                    new ErrorResponse(
                        `Phone ${phoneFound.phone} has been already registered with other account`,
                        400
                    )
                );
            }
        }

        // Asynchronously updates the only data that is coming in request.
        const updated = await User.findByIdAndUpdate(req.user._doc._id, data, {
            new: true,
            useFindAndModify: false,
        });

        const updatedData = { ...updated._doc };
        delete updatedData["passwordHash"];
        delete updatedData["createdAt"];
        delete updatedData["updatedAt"];
        delete updatedData["__v"];
        delete updatedData["privileges"];

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully updated the data",
            updatedData,
        });
    } catch (error) {
        return next(error);
    }
};
module.exports = { getUsers, postUser, getMyProfile, updateMyProfile };
