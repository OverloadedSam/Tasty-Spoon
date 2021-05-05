const express = require("express");
const router = express.Router();
const { protect } = require("../helpers/authentication");

router
    .route("/config/paypal")
    .get(async (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

module.exports = router;
