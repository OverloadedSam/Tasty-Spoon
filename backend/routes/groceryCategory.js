const express = require("express");
const router = express.Router();

const {
    getGroceryCategory,
    postGroceryCategory,
    putGroceryCategory,
} = require("../controllers/groceryCategory");

router
    .route("/grocerycategory")
    .get(getGroceryCategory)
    .post(postGroceryCategory);
router.route("/grocerycategory/:id").put(putGroceryCategory);

module.exports = router;
