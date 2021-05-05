const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const ErrorResponse = require("../utils/errorResponse");

const makeAnOrder = async (req, res, next) => {
    const userID = req.body.userId;
    const { cartItems, paymentMethod, shippingAddress } = req.body;

    if (cartItems && cartItems.length === 0)
        return next(new ErrorResponse("There are no items to order", 400));
    if (!paymentMethod)
        return next(new ErrorResponse("Invalid payment method", 400));

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

        let subtotalAmount = 0;
        let gst = 0;
        let deliveryCharges = 0.0;
        let totalPayableAmount = 0;

        const orderItems = [];

        for (let i = 0; i < cartItems.length; i++) {
            const productFound = await Product.findById(cartItems[i].prodId);

            subtotalAmount =
                subtotalAmount + cartItems[i].prodPrice * cartItems[i].qty;

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

        gst = parseFloat((subtotalAmount * 0.18).toFixed(2));

        if (subtotalAmount < 500) {
            deliveryCharges = 80.0;
            totalPayableAmount = (
                subtotalAmount +
                gst +
                deliveryCharges
            ).toFixed(2);
        } else if (subtotalAmount >= 500) {
            totalPayableAmount = (subtotalAmount + gst).toFixed(2);
        }

        const orderToSave = new Order({
            user: userDetails._id,
            receiverName: userDetails.firstName + " " + userDetails.lastName,
            phone: userDetails.phone,
            orderedItems: orderItems,
            shippingAddress,
            gst,
            deliveryCharges,
            totalPayableAmount,
            paymentMethod,
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
const updateOrderToPaid = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new ErrorResponse("Oder does not exists!", 400));
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        return res.status(200).json({
            success: true,
            status: 200,
            data: updatedOrder,
        });
    } catch (error) {
        return next(error);
    }
};

const getOrderById = async (req, res, next) => {
    const orderId = req.params.id;

    if (!orderId)
        return next(new ErrorResponse("Please provide correct order id!", 400));

    try {
        const order = await Order.findById(orderId).populate({
            path: "orderedItems user",
        });

        if (!order) {
            return next(
                new ErrorResponse("There is no order with this id!", 404)
            );
        }

        if (!req.user._id.equals(order.user._id))
            return next(
                new ErrorResponse("This order does not belongs to you!", 403)
            );

        if (order) {
            return res.status(200).json({
                success: true,
                status: 200,
                orderData: order,
            });
        }
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

module.exports = {
    makeAnOrder,
    getOrderDetailsByUserId,
    getOrderById,
    updateOrderToPaid,
};
