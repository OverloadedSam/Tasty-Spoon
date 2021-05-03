const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const ErrorResponse = require("../utils/errorResponse");

const makeAnOrder = async (req, res, next) => {
    const userID = req.body.userId;
    const cartItems = req.body.cartItems;

    try {
        const userDetails = await User.findById(userID);

        if (!userDetails) {
            return next(
                new ErrorResponse(
                    "Your data did not matched with our database try to logout and log in again!",
                    400
                )
            );
        }

        let totalAmount = 0;

        const orderItems = [];

        for (let i = 0; i < cartItems.length; i++) {
            const productFound = await Product.findById(cartItems[i].prodId);

            totalAmount =
                totalAmount + cartItems[i].prodPrice * cartItems[i].qty;

            orderItems.push({
                prodName: productFound.itemName,
                prodId: productFound._id,
                prodPrice: productFound.price,
                prodImage: productFound.image,
                qty: cartItems[i].qty,
            });

            if (!productFound || productFound.stockCount <= 0) {
                return next(
                    new ErrorResponse(
                        "Your order contains items that are currently not available. Check and remove such items from cart and then try again.",
                        404
                    )
                );
            }
        }

        if (totalAmount < 500) {
            totalAmount = totalAmount + totalAmount * 0.18 + 80;
        } else if (totalAmount >= 500) {
            totalAmount = totalAmount + totalAmount * 0.18;
        }

        const orderToSave = new Order({
            user: userDetails._id,
            receiverName: userDetails.firstName + " " + userDetails.lastName,
            phone: userDetails.phone,
            orderedItems: orderItems,
            shippingAdd: userDetails.address,
            status: "Sent for packing",
            totalPayableAmount: totalAmount,
            dateOrdered:
                new Date().toDateString() +
                " " +
                new Date().toLocaleTimeString(),
        });
        const order = await orderToSave.save();

        if (!order) {
            throw new Error("Order can not be saved");
        }

        return res.status(201).json({
            success: true,
            status: 201,
            data: order,
        });
    } catch (error) {
        return next(error);
    }
};

const getOrderDetailsByUserId = async (req, res, next) => {
    try {
        const orderFound = await Order.find({ user: req.user._id }).populate({
            path: "orderedItems",
        });

        if (!orderFound || orderFound.length === 0) {
            return next(
                new ErrorResponse("You have not ordered anything yet!", 404)
            );
        }

        if (orderFound) {
            return res.status(200).json({
                success: true,
                status: 200,
                orderData: orderFound,
            });
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = { makeAnOrder, getOrderDetailsByUserId };
