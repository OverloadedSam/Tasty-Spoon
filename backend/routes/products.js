const express = require("express");
const router = express.Router();
const {
    getProducts,
    postProducts,
    deleteProductById,
    putProductById,
} = require("../controllers/products");

router.route("/products").get(getProducts).post(postProducts);
router.route("/product/:id").delete(deleteProductById).put(putProductById);

module.exports = router;
