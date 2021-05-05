const express = require("express");
const router = express.Router();

const { protect } = require("../helpers/authentication");

const {
    makeAnOrder,
    getOrderDetailsByUserId,
    getOrderById,
    updateOrderToPaid,
} = require("../controllers/orders");

router.route("/checkout").post(protect, makeAnOrder);
router.route("/order/:id").get(protect, getOrderById);
router.route("/payorder/:id").put(protect, updateOrderToPaid);
router.route("/getmyorders/:id").get(protect, getOrderDetailsByUserId);

module.exports = router;
