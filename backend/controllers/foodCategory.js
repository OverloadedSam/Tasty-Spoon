const mongoose = require("mongoose");
const FoodCategory = require("../models/foodCategory"); // Model
const { foodCategoryValidator } = require("../helpers/dataValidation");
const { foodDataUpdateValidator } = require("../helpers/updatedDataValidation");

// Get food categories [READ]
const getFoodCategory = async (req, res) => {
    try {
        var response = await FoodCategory.find();
    } catch (error) {
        console.log("Some error  ocurred in promise");
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Bad request can not get food categories",
        });
    }
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Post the food category [CREATE]
const postFoodCategory = async (req, res) => {
    const { value, error } = foodCategoryValidator(req.body); // Validate input data.

    // If data is invalid then return ValidationError in response.
    if (error) {
        return res.status(400).json({
            status: 400,
            error: "ValidationError",
            message: error.details[0].message,
        });
    }

    // Make new object to save it in DB.
    const foodCategory = new FoodCategory({
        id: req.body.id,
        name: req.body.name,
        icon: req.body.icon,
    });

    try {
        var savedResponse = await foodCategory.save(); // Create in DB asynchronously.
    } catch (error) {
        console.log("Error in posting food category");
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

// Put/Update food category [UPDATE]
const putFoodCategory = async (req, res) => {
    const dataToBeUpdated = req.body;
    // Updated data validation for Food-Category, returns error if invalid.
    const { error } = foodDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Please provide correct data for food category",
            error,
        });
    }
    try {
        // Updates Food-Category asynchronously.
        const updateCategory = await FoodCategory.findByIdAndUpdate(
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
            message: `Food category information for id ${updateCategory._id} has been updated`,
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

module.exports = { getFoodCategory, postFoodCategory, putFoodCategory };
