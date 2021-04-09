const mongoose = require("mongoose");
const GroceryCategory = require("../models/groceryCategory"); // Model
const { groceryCategoryValidator } = require("../helpers/dataValidation");
const {
    groceryDataUpdateValidator,
} = require("../helpers/updatedDataValidation");
const { update } = require("../models/groceryCategory");

// Get grocery categories [READ]
const getGroceryCategory = async (req, res) => {
    try {
        var response = await GroceryCategory.find();
    } catch (error) {
        console.log("Some error ocurred in promise");
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Bad request can not get grocery categories",
        });
    }
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Post the grocery category [CREATE]
const postGroceryCategory = async (req, res) => {
    const { value, error } = groceryCategoryValidator(req.body); // Validate input data.

    // If data is invalid then return ValidationError in response.
    if (error) {
        return res.status(400).json({
            status: 400,
            error: "ValidationError",
            message: error.details[0].message,
        });
    }

    // Make new object to save it in DB.
    const groceryCategory = new GroceryCategory({
        id: req.body.id,
        name: req.body.name,
        isEdible: req.body.isEdible,
        icon: req.body.icon,
    });

    try {
        var savedResponse = await groceryCategory.save(); // Create in DB asynchronously.
    } catch (error) {
        console.log("Error in posting grocery category");
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "id must be unique",
            error,
        });
    }

    // Return the response with created.
    return res.status(201).json({
        success: true,
        status: 201,
        data: savedResponse,
    });
};

// Put/Update grocery category [UPDATE]
const putGroceryCategory = async (req, res) => {
    const dataToBeUpdated = req.body;
    // Updated data validation for Grocery-Category, returns error if invalid.
    const { error } = groceryDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Please provide correct data for grocery category",
            error,
        });
    }
    try {
        // Updates Grocery-Category asynchronously.
        const updateCategory = await GroceryCategory.findByIdAndUpdate(
            req.params.id,
            dataToBeUpdated,
            { new: true, useFindAndModify: false }
        );

        // Return false in success if id is not found.
        if (!updateCategory) {
            return res.status(404).json({
                success: false,
                message: "Id not found please provide correct id",
            });
        }

        // Updates data in DB and Returns true in success if everything is ok.
        return res.status(200).json({
            success: true,
            message: `Grocery category information for id ${updateCategory._id} has been updated`,
            data: updateCategory,
        });
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        // Catches errors if mongoDB ObjectId is invalid or some other error raise.
        return res.status(500).json({
            success: false,
            message: "Invalid id or id is incorrect. please provide correct id",
            error,
        });
    }
};

module.exports = {
    getGroceryCategory,
    postGroceryCategory,
    putGroceryCategory,
};
