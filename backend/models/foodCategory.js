const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            require: true,
        },
        name: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 40,
            lowerCase: true,
        },
        isVeg: {
            type: Boolean,
            require: true,
        },
        color: {
            type: String,
            lowerCase: true,
            default: "green",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Food-Category", foodCategorySchema);
