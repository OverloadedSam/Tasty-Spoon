const express = require("express");
const router = express.Router();

const {
    getFoodCategory,
    postFoodCategory,
    putFoodCategory,
} = require("../controllers/foodCategory");

router.route("/foodcategory").get(getFoodCategory).post(postFoodCategory);
router.route("/foodcategory/:id").put(putFoodCategory);

module.exports = router;
