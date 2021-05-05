import axios from "axios";
import {
    addToCartReq,
    addToCartSuccess,
    addToCartFail,
    removeFromCartSuccess,
    removeFromCartFail,
    saveShippingAddress,
    savePaymentMethod,
} from "../action-creators/cartActionCreator";
import { REMOVED_ALL_FROM_CART } from "../action-types/cartActionTypes";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        dispatch(addToCartReq());

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

export const removeAllFromCart = () => async (dispatch) => {
    try {
        dispatch({ type: REMOVED_ALL_FROM_CART });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch(removeFromCartFail(error));
    }
};

export const saveAddressToCart = (address) => async (dispatch) => {
    try {
        dispatch(saveShippingAddress(address));

        localStorage.setItem("shippingAddress", JSON.stringify(address));
    } catch (e) {
        console.log("Error ocurred while saving shipping address", e);
    }
};

export const savePaymentMethodToCart = (paymentMethod) => async (dispatch) => {
    try {
        dispatch(savePaymentMethod(paymentMethod));

        localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    } catch (e) {
        console.log("Error ocurred while saving payment method", e);
    }
};
