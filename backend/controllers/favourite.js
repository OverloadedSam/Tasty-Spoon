const Favourite = require("../models/favourite");
const Product = require("../models/product");
const ErrorResponse = require("../utils/errorResponse");

const addToFavourites = async (req, res, next) => {
    const id = req.body.id;

    if (!id) {
        return next(new ErrorResponse("Please provide an product id!", 400));
    }

    try {
        const product = await Product.findById(id);
        if (!product)
            return next(
                new ErrorResponse("Please provide correct product id!", 400)
            );

        const userFavourite = await Favourite.findOne({ user: req.user._id });

        if (!userFavourite) {
            const userFavourite = new Favourite({
                user: req.user._id,
                favouriteItems: [`${product._id}`],
            });

            const favourite = await userFavourite.save();
            return res.status(200).json({
                success: true,
                data: favourite,
            });
        }

        userFavourite.favouriteItems = userFavourite.favouriteItems.filter(
            (favId) => String(favId) !== id
        );
        userFavourite.favouriteItems.push(product._id);
        const isSaved = await userFavourite.save();

        if (!isSaved) {
            return next(new ErrorResponse("can not add to favourites!"), 500);
        }

        return res.status(200).json({
            success: true,
            data: isSaved,
        });
    } catch (error) {
        return next(error);
    }
};

const getFavouritesByUserId = async (req, res, next) => {
    try {
        const favourite = await Favourite.findOne({
            user: req.user._id,
        }).populate({
            path: "favouriteItems",
        });

        return res.status(200).json({
            success: true,
            data: favourite.favouriteItems,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteFromFavourites = async (req, res, next) => {
    const favProductId = req.params.productid;

    try {
        const favourite = await Favourite.findOneAndUpdate(
            { user: req.user._id },
            { $pullAll: { favouriteItems: [favProductId] } },
            { new: true, useFindAndModify: false, runValidators: true }
        );

        if (!favourite) {
            return next(
                new ErrorResponse("Failed to delete the from favourites!", 404)
            );
        }

        return res.status(200).json({
            success: true,
            data: favourite.favouriteItems,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    addToFavourites,
    getFavouritesByUserId,
    deleteFromFavourites,
};
