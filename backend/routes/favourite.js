const express = require("express");
const router = express.Router();
const { protect } = require("../helpers/authentication");
const {
    addToFavourites,
    getFavouritesByUserId,
    deleteFromFavourites,
} = require("../controllers/favourite");

router.route("/addtofavourite/").post(protect, addToFavourites);
router.route("/favourites/").get(protect, getFavouritesByUserId);
router.route("/favourites/:productid").delete(protect, deleteFromFavourites);

module.exports = router;
