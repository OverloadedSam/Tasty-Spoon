const express = require("express");
const router = express.Router();
const {
    getUsers,
    postUser,
    getUserById,
    putUserById,
} = require("../controllers/users");

router.route("/users").get(getUsers).post(postUser);
router.route("/user/:id").get(getUserById).put(putUserById);

module.exports = router;
