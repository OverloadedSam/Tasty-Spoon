const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            maxLength: 31,
            trim: true,
            lowerCase: true,
        },
        lastName: {
            type: String,
            require: true,
            maxLength: 31,
            trim: true,
            lowerCase: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            maxLength: 400,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            require: true,
            maxLength: 10,
            unique: true,
        },
        privileges: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
