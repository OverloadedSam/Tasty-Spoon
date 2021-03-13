const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const foodItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            require: true,
            trim: true,
            minLength: 3,
            maxLength: 40,
            lowerCase: true,
        },
        description: {
            type: String,
            require: true,
            trim: true,
            minLength: 5,
            maxLength: 250,
            lowerCase: true,
        },
        richDescription: {
            type: String,
            trim: true,
            minLength: 5,
            maxLength: 500,
            lowerCase: true,
        },
        image: {
            type: String,
            trim: true,
            require: true,
        },
        imageArray: {
            type: Array,
        },
        price: {
            type: Number,
            require: true,
            min: 20,
            max: 10000,
        },
        category: {
            type: ObjectId,
            ref: "Food-Category",
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Food-Item", foodItemSchema);
