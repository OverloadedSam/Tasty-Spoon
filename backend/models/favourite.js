const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const favouriteSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "Users",
        required: [
            true,
            "Please specify the user in order to add item to favourite section!",
        ],
    },
    favouriteItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Products",
        },
    ],
});

module.exports = mongoose.model("Favourites", favouriteSchema);
