const express = require("express");
const router = express.Router();
const {
    getProducts,
    postProducts,
    deleteProductById,
} = require("../controllers/products");

router.route("/products").get(getProducts).post(postProducts);
router.route("/product/:id").delete(deleteProductById)

module.exports = router;
