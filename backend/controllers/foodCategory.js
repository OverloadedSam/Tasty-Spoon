const FoodCategory = require("../models/foodCategory"); // Model
const { foodCategoryValidator } = require("../helpers/dataValidation");
const { foodDataUpdateValidator } = require("../helpers/updatedDataValidation");
const ErrorResponse = require("../utils/errorResponse");

// Get food categories [READ]
const getFoodCategory = async (req, res, next) => {
    try {
        var response = await FoodCategory.find();
    } catch (error) {
        console.log("Some error  ocurred in promise");
        console.log(error);
        return next(error);
    }
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Get food categories by specifying the category id [READ]
const getFoodCategoryById = async (req, res, next) => {
    try {
        var response = await FoodCategory.findById(req.params.id);
        if (!response) {
            return next(
                new ErrorResponse(
                    `Can not get Food Category for the id "${req.params.id}"`,
                    404
                )
            );
        }
    } catch (error) {
        return next(error);
    }

    return res.status(200).json({
        success: true,
        category: response,
    });
};

// Get food categories by specifying the name of category [READ]
const getFoodCategoryByName = async (req, res, next) => {
    try {
        var response = await FoodCategory.findOne({ name: req.query.name });
        if (response === null) {
            return next(
                new ErrorResponse(
                    `There is no food category for the name "${req.query.name}"`,
                    404
                )
            );
        }
    } catch (error) {
        console.log("Some error ocurred");
        return next(error);
    }

    return res.status(200).json({
        success: true,
        category: response,
    });
};

// Post the food category [CREATE]
const postFoodCategory = async (req, res, next) => {
    const { value, error } = foodCategoryValidator(req.body); // Validate input data.

    // If data is invalid then return ValidationError in response.
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data! error.details[0].message`,
                406
            )
        );
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
        return next(error);
    }

    // Return the response with created.
    return res.status(201).json({
        success: true,
        status: 201,
        data: savedResponse,
    });
};

// Put/Update food category [UPDATE]
const putFoodCategory = async (req, res, next) => {
    const dataToBeUpdated = req.body;
    // Updated data validation for Food-Category, returns error if invalid.
    const { error } = foodDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data for food category. ${error.details[0].message}`,
                406
            )
        );
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
            return next(
                new ErrorResponse(
                    `Update request for id ${req.params.id} has been failed! Please provide correct id`,
                    400
                )
            );
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
        return next(error);
    }
};

module.exports = {
    getFoodCategory,
    postFoodCategory,
    putFoodCategory,
    getFoodCategoryById,
    getFoodCategoryByName,
};
