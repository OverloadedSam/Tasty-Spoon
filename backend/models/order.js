const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            require: true,
            ref: "User",
        },
        receiverName: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            require: true,
        },
        paymentMethod: {
            type: String,
            default: "Cash on delivery",
        },
        orderedItems: [
            {
                prodName: { type: String, required: true },
                prodId: {
                    type: ObjectId,
                    required: true,
                    ref: "Products",
                },
                prodPrice: { type: Number, required: true },
                prodImage: { type: String, required: true },
                qty: { type: Number, required: true },
            },
        ],
        shippingAdd: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            Default: "Shipped",
        },
        totalPayableAmount: {
            type: Number,
            require: true,
        },
        dateOrdered: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
