const mongoose = require("mongoose");
const Product = require("../models/product");
const { productValidator } = require("../helpers/dataValidation");

// Get food/meals [READ]
const getProducts = async (req, res) => {
    try {
        var response = await Product.find().populate({
            path: "category"
        }); // Read all food-items from the DB.
    } catch (error) {
        console.log("Some error  ocurred in promise");
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Bad request can not get the products",
        });
    }

    // Return the food-items list in response.
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Post food/meals [CREATE]
const postProducts = async (req, res) => {

    // validate food-items input data.
    const { value, error } = productValidator(req.body);
    if (error) {
        return res.status(406).json({
            status: 406,
            error: "ValidationError",
            message: error.details[0].message,
        });
    }

    // Create an object to save/create it in DB.
    const foodItem = new Product({
        itemName: req.body.itemName,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        imageArray: req.body.imageArray,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        isVeg: req.body.isVeg,
        tags: req.body.tags,
        brand: req.body.brand,
        productType: req.body.productType,
        ingredients: req.body.ingredients,
        quantity: req.body.quantity,

    });

    try {
        var savedResponse = await foodItem.save(); // Create the product in DB asynchronously.
    } catch (error) {
        console.log("Error in posting food item");
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "something went wrong",
            error,
        });
    }

    // Return the success in response.
    return res.status(201).json({
        success: true,
        status: 201,
        data: savedResponse,
    });
};

module.exports = { getProducts, postProducts };
