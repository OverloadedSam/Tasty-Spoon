const mongoose = require("mongoose");

const groceryCategorySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            require: true,
            min: 0,
            max: 10000,
        },
        name: {
            // name foodGrains, oils, households etc.
            type: String,
            unique: true,
            trim: true,
            minLength: 3,
            maxLength: 40,
            lowercase: true,
            require: true,
        },
        isEdible: {
            type: Boolean,
        },
        icon: {
            type: String,
            default: "burger.icon",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Grocery-Category", groceryCategorySchema);
