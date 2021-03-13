const mongoose = require("mongoose");
const FoodCategory = require("../models/foodCategory"); // Model
const { foodCategoryValidator } = require("../helpers/dataValidation");

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
        isVeg: req.body.isVeg,
        color: req.body.color,
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

module.exports = { getFoodCategory, postFoodCategory };
