const Product = require("../models/product");
const { productValidator } = require("../helpers/dataValidation");
const {
    productDataUpdateValidator,
} = require("../helpers/updatedDataValidation");
const ErrorResponse = require("../utils/errorResponse");

// Get all Products [READ]
const getProducts = async (req, res, next) => {
    try {
        var response = await Product.find().populate({
            path: "category",
        }); // Read all food-items from the DB.
    } catch (error) {
        console.log("Some error  ocurred in promise");
        console.log(error);
        return next(error);
    }

    // Return the food-items list in response.
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Get all the products that by specifying product type.
const getByProductType = async (req, res, next) => {
    try {
        if (req.params.prodtype === "meals") {
            var response = await Product.find({
                productType: "Food-Category",
            }).populate({
                path: "category",
            }); // Read all food-items from the DB.
        } else if (req.params.prodtype === "groceries") {
            var response = await Product.find({
                productType: "Grocery-Category",
            }).populate({
                path: "category",
            }); // Read all grocery-items from the DB.
        } else {
            return next(
                new ErrorResponse(
                    `Failed to get products for "${req.params.prodtype}"`,
                    400
                )
            );
        }

        if (response.length === 0) {
            return next(
                new ErrorResponse(
                    `Nothing found in the database for ${req.params.prodype}`,
                    404
                )
            );
        }
    } catch (error) {
        console.log("Some error  ocurred in promise");
        console.log(error);
        return next(error);
    }

    // Return the food-items list in response.
    return res.status(200).json({
        success: true,
        data: response,
    });
};

// Get all the products by specifying a category and product type.
const getProductsByCategory = async (req, res, next) => {
    const prodType = req.query.pt;
    const cat = req.query.category;

    try {
        let products = await Product.find({ productType: prodType }).populate({
            path: "category",
        });

        if (products.length !== 0) {
            products = products.filter((prod) => prod.category.name === cat);

            if (products.length !== 0) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: products,
                });
            }
        }

        if (products.length === 0) {
            return next(
                new ErrorResponse(`Nothing found for category ${cat}`, 404)
            );
        }
    } catch (error) {
        return next(error);
    }
};

// Get/Read Product by specifying an id
const getProductById = async (req, res, next) => {
    try {
        const productData = await Product.findById(req.params.id).populate({
            path: "category",
        }); // Read only one product using given id.

        // Returns false in response if product is not found.
        if (!productData) {
            return next(
                new ErrorResponse(
                    `Id doesn't exist. Please provide correct product id`,
                    404
                )
            );
        }

        // Returns response with data if product is found.
        return res.status(200).json({
            success: true,
            productData,
        });
    } catch (error) {
        // Catches errors if id is invalid, or some other issue raise.
        console.log(error);
        return next(error);
    }
};

// Post Product [CREATE]
const postProducts = async (req, res, next) => {
    // validate food-items input data.
    const { value, error } = productValidator(req.body);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data! ${error.details[0].message}`,
                406
            )
        );
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
        return next(error);
    }

    // Return the success in response.
    return res.status(201).json({
        success: true,
        status: 201,
        data: savedResponse,
    });
};

// Delete a product by specifying an id. [DELETE]
const deleteProductById = async (req, res, next) => {
    try {
        const productFound = await Product.findByIdAndDelete(req.params.id);
        // Returns false in response if product is not found.
        if (!productFound) {
            return next(
                new ErrorResponse(
                    `Provided ID ${req.params.id} did not found. please specify correct id`,
                    404
                )
            );
        }

        // Returns success in response if product is found.
        if (productFound) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Product deleted successfully",
                deletedProduct: productFound,
            });
        }
    } catch (error) {
        // Catches error if id is invalid, incorrect or some other error raise.
        console.log("Some error ocurred while processing req");
        console.log(error);
        return next(error);
    }
};

// Put/Update a product in DB by specifying an id. [PUT]
const putProductById = async (req, res, next) => {
    const dataToBeUpdated = req.body;

    // Updated data validation for Product, returns error if invalid.
    const { error } = productDataUpdateValidator(dataToBeUpdated);
    if (error) {
        return next(
            new ErrorResponse(
                `Please provide correct data format! ${error.details[0].message}`,
                406
            )
        );
    }

    try {
        // Updates product by giving an id and returns success response.
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            dataToBeUpdated,
            { new: true, useFindAndModify: false }
        );

        if (!updateProduct) {
            return next(
                new ErrorResponse(
                    `Product id "${req.params.id}" not found please provide correct id`,
                    404
                )
            );
        }

        return res.status(200).json({
            success: true,
            message: "Product information updated successfully",
            updatedData: updateProduct,
        });
    } catch (error) {
        // Catches errors if mongoDB ObjectId is invalid.
        return next(error);
    }
};

// Get products in paginated form by specifying page number.
const paginateData = async (req, res, next) => {
    try {
        const page = Math.abs(parseInt(req.query.page)) || 1;
        const pageSize = 12;
        const items = pageSize * (page - 1);

        const filter = req.params.prodtype
            ? { productType: req.params.prodtype }
            : {};
        const totalCount = await Product.find(filter).count();
        const products = await Product.find(filter).skip(items).limit(pageSize);

        return res.status(200).json({
            success: true,
            status: 200,
            totalCount,
            count: products.length,
            data: products,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getProducts,
    postProducts,
    deleteProductById,
    putProductById,
    getProductById,
    getByProductType,
    getProductsByCategory,
    paginateData,
};
