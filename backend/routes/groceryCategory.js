const express = require("express");
const router = express.Router();

const {
    getGroceryCategory,
    postGroceryCategory,
    putGroceryCategory,
    getGroceryCategoryById,
    getGroceryCategoryByName,
} = require("../controllers/groceryCategory");

router
    .route("/grocerycategory")
    .get(getGroceryCategory)
    .post(postGroceryCategory);
router
    .route("/grocerycategory/:id")
    .put(putGroceryCategory)
    .get(getGroceryCategoryById);
router.route("/grocerycategorybyname/").get(getGroceryCategoryByName);

module.exports = router;
