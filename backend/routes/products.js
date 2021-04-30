const express = require("express");
const router = express.Router();
const {
    getProducts,
    postProducts,
    deleteProductById,
    putProductById,
    getProductById,
    getByProductType,
    getProductsByCategory,
} = require("../controllers/products");

router.route("/products").get(getProducts).post(postProducts);
router.route("/products/category").get(getProductsByCategory);
router.route("/products/:prodtype").get(getByProductType);
router
    .route("/product/:id")
    .get(getProductById)
    .delete(deleteProductById)
    .put(putProductById);

module.exports = router;
