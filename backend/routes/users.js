const express = require("express");
const router = express.Router();
const { getUsers, postUser, getUserById } = require("../controllers/users");

router.route("/users").get(getUsers).post(postUser);
router.route("/user/:id").get(getUserById);

module.exports = router;
