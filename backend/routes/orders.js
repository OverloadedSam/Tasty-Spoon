const express = require("express");
const router = express.Router();

const { protect } = require("../helpers/authentication");

const {
    makeAnOrder,
    getOrderDetailsByUserId,
} = require("../controllers/orders");

router.route("/checkout").post(protect, makeAnOrder);
router.route("/getmyorders/:id").get(protect, getOrderDetailsByUserId);

module.exports = router;
