const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) {
        next();
    }

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const updatedDocument = this.getUpdate();
    if (!updatedDocument.passwordHash) {
        next();
    }

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    updatedDocument.passwordHash = await bcryptjs.hash(
        updatedDocument.passwordHash,
        salt
    );
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
