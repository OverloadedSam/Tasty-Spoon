import axios from "axios";
import {
    addToCartReq,
    addToCartSuccess,
    addToCartFail,
    removeFromCartSuccess,
    removeFromCartFail,
} from "../action-creators/cartActionCreator";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        dispatch(addToCartReq);

        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/${id}`
        );

        const productObj = {
            prodImage: data.productData.image,
            prodId: data.productData._id,
            prodName: data.productData.itemName,
            prodPrice: data.productData.price,
            prodStockCount: data.productData.stockCount,
            qty,
        };

        dispatch(addToCartSuccess(productObj));

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        dispatch(addToCartFail(error));
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        const filteredItems = getState().cart.cartItems.filter(
            (item) => item.prodId !== id
        );

        dispatch(removeFromCartSuccess(filteredItems));

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        dispatch(removeFromCartFail(error));
    }
};
