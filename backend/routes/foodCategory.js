const express = require("express");
const router = express.Router();

const {
    getFoodCategory,
    postFoodCategory,
    putFoodCategory,
    getFoodCategoryById,
    getFoodCategoryByName,
} = require("../controllers/foodCategory");

router.route("/foodcategory").get(getFoodCategory).post(postFoodCategory);
router.route("/foodcategory/:id").put(putFoodCategory).get(getFoodCategoryById);
router.route("/foodcategorybyname/").get(getFoodCategoryByName);

module.exports = router;
