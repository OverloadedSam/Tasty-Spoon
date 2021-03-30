const express = require("express");
const router = express.Router();

const {
    getGroceryCategory,
    postGroceryCategory,
} = require("../controllers/groceryCategory");

router.route("/grocerycategory").get(getGroceryCategory).post(postGroceryCategory);

module.exports = router;
