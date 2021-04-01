const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            maxLength: 31,
            trim: true,
            lowercase: true,
        },
        lastName: {
            type: String,
            require: true,
            maxLength: 31,
            trim: true,
            lowercase: true,
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
            lowercase: true,
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
