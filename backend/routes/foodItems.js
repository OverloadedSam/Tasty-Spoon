const express = require("express");
const router = express.Router();
const { getFoodItems, postFoodItems } = require("../controllers/foodItems");

router.route("/fooditems").get(getFoodItems).post(postFoodItems);

module.exports = router;
