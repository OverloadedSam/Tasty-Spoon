import axios from "axios";
import {
    addToFavReq,
    addToFavSuccess,
    addToFavFail,
    favItemReq,
    favItemSuccess,
    favItemFail,
    removeFromFavReq,
    removeFromFavSuccess,
    removeFromFavFail,
} from "../action-creators/favouriteActionCreator";

const apiUrl = process.env.REACT_APP_API_URL;

export const addItemToFavourites =
    (productId) => async (dispatch, getState) => {
        dispatch(addToFavReq(productId));

        try {
            const token =
                getState().userSignIn.userData.token ||
                JSON.parse(localStorage.getItem("userData")).token;

            if (!token) throw new Error("Add to favourite failed!");

            const config = {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                `${apiUrl}/addtofavourite`,
                { id: productId },
                config
            );

            dispatch(addToFavSuccess(data.data));
        } catch (error) {
            dispatch(addToFavFail(error));
        }
    };

export const showFavouriteItems = () => async (dispatch, getState) => {
    dispatch(favItemReq());

    try {
        const token =
            getState().userSignIn.userData.token ||
            JSON.parse(localStorage.getItem("userData")).token;

        if (!token) throw new Error("Please logout and login again!");

        const config = {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${apiUrl}/favourites`, config);

        dispatch(favItemSuccess(data.data));
    } catch (error) {
        dispatch(favItemFail(error));
    }
};

export const removeFromFavourites =
    (productId) => async (dispatch, getState) => {
        dispatch(removeFromFavReq());

        try {
            const token =
                getState().userSignIn.userData.token ||
                JSON.parse(localStorage.getItem("userData")).token;

            if (!token) throw new Error("Please logout and login again!");

            const config = {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.delete(
                `${apiUrl}/favourites/${productId}`,
                config
            );

            const filteredProducts = getState().favourites.items.filter(
                (item) => item._id !== productId
            );

            if (data.success) {
                dispatch(removeFromFavSuccess(filteredProducts));
            } else {
                throw new Error("Can not delete this item from favourites");
            }
        } catch (error) {
            dispatch(removeFromFavFail(error));
        }
    };
