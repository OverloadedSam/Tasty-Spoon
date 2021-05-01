const GroceryCategory = require("../models/groceryCategory"); // Model
const { groceryCategoryValidator } = require("../helpers/dataValidation");
const {
    groceryDataUpdateValidator,
} = require("../helpers/updatedDataValidation");
const ErrorResponse = require("../utils/errorResponse");

// Get grocery categories [READ]
const getGroceryCategory = async (req, res, next) => {
    try {
        var response = await GroceryCategory.find();
    } catch (error) {
        console.log("Some error ocurred in promise");
        console.log(error);
        return next(error);
    }
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Get grocery categories by specifying the id [READ]
const getGroceryCategoryById = async (req, res, next) => {
    try {
        var response = await GroceryCategory.findById(req.params.id);
        if (!response) {
            return next(
                new ErrorResponse(
                    `Can not get Grocery Category for the id "${req.params.id}"`,
                    404
                )
            );
        }
    } catch (error) {
        console.log("Some error ocurred in promise");
        return next(error);
    }

    return res.status(200).json({
        success: true,
        category: response,
    });
};

// Get grocery categories by specifying the name of category [READ]
const getGroceryCategoryByName = async (req, res, next) => {
    console.log("this by name is running!!!!!");
    try {
        var response = await GroceryCategory.findOne({ name: req.query.name });
        if (response === null) {
            return next(
                new ErrorResponse(
                    `There is no grocery category for name "${req.query.name}"`,
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

// Post the grocery category [CREATE]
const postGroceryCategory = async (req, res, next) => {
    const { value, error } = groceryCategoryValidator(req.body); // Validate input data.

    // If data is invalid then return ValidationError in response.
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data! ${error.details[0].message}`,
                406
            )
        );
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
        return next(error);
    }

    // Return the response with created.
    return res.status(201).json({
        success: true,
        status: 201,
        data: savedResponse,
    });
};

// Put/Update grocery category [UPDATE]
const putGroceryCategory = async (req, res, next) => {
    const dataToBeUpdated = req.body;
    // Updated data validation for Grocery-Category, returns error if invalid.
    const { error } = groceryDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data for grocery category! ${error.details[0].message}`,
                406
            )
        );
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
            message: `Grocery category information for id ${updateCategory._id} has been updated`,
            data: updateCategory,
        });
    } catch (error) {
        console.log("Some error ocurred");
        console.log(error);
        // Catches errors if mongoDB ObjectId is invalid or some other error raise.
        return next(error);
    }
};

module.exports = {
    getGroceryCategory,
    postGroceryCategory,
    putGroceryCategory,
    getGroceryCategoryById,
    getGroceryCategoryByName,
};
