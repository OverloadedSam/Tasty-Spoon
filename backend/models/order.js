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
            required: true,
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
        shippingAddress: {
            district: {
                type: String,
                required: true,
                enum: [
                    "Central Delhi",
                    "East Delhi",
                    "New Delhi",
                    "North Delhi",
                    "North East Delhi",
                    "North West Delhi",
                    "Shahdra",
                    "South Delhi",
                    "South East Delhi",
                    "South West Delhi",
                    "West Delhi",
                ],
            },
            pinCode: { type: Number, required: true, min: 100001, max: 201313 },
            landmark: { type: String, maxLength: 128 },
            address: {
                type: String,
                required: true,
                minLength: 10,
                maxLength: 1024,
            },
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        gst: {
            type: Number,
            required: true,
            default: 0.0,
        },
        deliveryCharges: {
            type: Number,
            default: 0.0,
        },
        totalPayableAmount: {
            type: Number,
            require: true,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        dateOrdered: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
