const mongoose = require("mongoose");
const Product = require("../models/product");
const { productValidator } = require("../helpers/dataValidation");
const {
    productDataUpdateValidator,
} = require("../helpers/updatedDataValidation");

// Get all Products [READ]
const getProducts = async (req, res) => {
    try {
        var response = await Product.find().populate({
            path: "category",
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

// Get/Read Product by specifying an id
const getProductById = async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id).populate({
            path: "category",
        }); // Read only one product using given id.

        // Returns false in response if product is not found.
        if (!productData) {
            return res.status(404).json({
                success: false,
                message: "Id doesn't exist. Please provide correct product id",
            });
        }

        // Returns response with data if product is found.
        return res.status(200).json({
            success: true,
            productData,
        });
    } catch (error) {
        // Catches errors if id is invalid, or some other issue raise.
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Could not find product! product id is not valid. please provide correct id",
        });
    }
};

// Post Product [CREATE]
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
        stockCount: req.body.stockCount,
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

// Delete a product by specifying an id. [DELETE]
const deleteProductById = async (req, res) => {
    try {
        const productFound = await Product.findByIdAndDelete(req.params.id);
        // Returns false in response if product is not found.
        if (!productFound) {
            return res.status(404).json({
                success: false,
                message:
                    "ID you provided did not found. please specify correct id",
            });
        }

        // Returns success in response if product is found.
        if (productFound) {
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                deletedProduct: productFound,
            });
        }
    } catch (error) {
        // Catches error if id is invalid, incorrect or some other error raise.
        console.log(
            "Some error ocurred may be because of invalid format for product id"
        );
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Maybe invalid product id. Please provide correct product id",
            error,
        });
    }
};

// Put/Update a product in DB by specifying an id. [PUT]
const putProductById = async (req, res) => {
    const dataToBeUpdated = req.body;

    // Updated data validation for Product, returns error if invalid.
    const { error } = productDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Please provide correct data format",
            error,
        });
    }

    try {
        const productFound = await Product.findById(req.params.id);
        if (!productFound) {
            // If product id doesn't exist then returns response with 404.
            return res.status(404).json({
                success: false,
                message: "Product id not found please provide correct id",
            });
        }

        // Updates product by giving an id and returns success response.
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            dataToBeUpdated,
            { new: true, useFindAndModify: false }
        );
        return res.status(200).json({
            success: true,
            message: "Product information updated successfully",
            updatedData: updateProduct,
        });
    } catch (error) {
        // Catches errors if mongoDB ObjectId is invalid.
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while updating, could not update the product information",
            error,
        });
    }
};

module.exports = {
    getProducts,
    postProducts,
    deleteProductById,
    putProductById,
    getProductById,
};
