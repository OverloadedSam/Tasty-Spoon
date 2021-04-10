const express = require("express");
const router = express.Router();
const { userSignIn } = require("../controllers/signIn");

router.route("/signin").post(userSignIn);

module.exports = router;
