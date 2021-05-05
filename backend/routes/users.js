const express = require("express");
const router = express.Router();
const { protect, admin } = require("../helpers/authentication");
const {
    getUsers,
    postUser,
    getMyProfile,
    updateMyProfile,
} = require("../controllers/users");

router
    .route("/users")
    .get(protect, admin, getUsers)
    .post(protect, admin, postUser);
router.route("/me").get(protect, getMyProfile).put(protect, updateMyProfile);

module.exports = router;
