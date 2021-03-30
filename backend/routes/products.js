const express = require("express");
const router = express.Router();
const { getProducts, postProducts } = require("../controllers/products");

router.route("/products").get(getProducts).post(postProducts);

module.exports = router;
