const express = require('express');
const router = express.Router();

const { getFoodCategory, postFoodCategory } = require("../controllers/foodCategory");

router.route("/foodcategory").get(getFoodCategory).post(postFoodCategory);

module.exports = router;