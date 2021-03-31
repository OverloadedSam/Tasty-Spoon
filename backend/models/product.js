const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            require: true,
            trim: true,
            minLength: 3,
            maxLength: 50,
            lowercase: true,
        },
        description: {
            type: String,
            require: true,
            trim: true,
            minLength: 5,
            maxLength: 300,
            lowercase: true,
        },
        richDescription: {
            type: [String],
        },
        image: {
            type: String,
            trim: true,
            require: true,
        },
        imageArray: {
            type: [String],
        },
        price: {
            // if the prices are more than 1000 taxes and duties may be imposed
            type: Number,
            require: true,
            min: 20,
            max: 10000,
        },
        category: {
            type: ObjectId,
            refPath: "productType",
        },
        rating: {
            // Give rating out of 5
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isVeg: {
            // Mostly used with edible items
            type: Boolean,
        },
        tags: {
            // Used for searching and filtering
            type: [String],
        },
        brand: {
            // May be required in grocery
            type: String,
            lowercase: true,
            minLength: 2,
            maxLength: 30,
        },
        productType: {
            // Meal/Food or Grocery
            type: String,
            minLength: 4,
            maxLength: 40,
            require: true,
        },
        ingredients: {
            type: [String],
        },
        quantity: {
            // Weights or pieces
            type: String,
            maxLength: 30,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
