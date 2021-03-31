const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            require: true,
            min: 0,
            max: 10000,
        },
        name: {
            // name like burgers, foodGrains, oils soups, beverages etc.
            type: String,
            unique: true,
            trim: true,
            minLength: 3,
            maxLength: 40,
            lowercase: true,
            require: true,
        },
        icon: {
            type: String,
            default: "burger.icon",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Food-Category", foodCategorySchema);
