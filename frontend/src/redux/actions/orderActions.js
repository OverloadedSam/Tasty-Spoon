import * as actions from "../action-types/OrderActionTypes";
import {
    placeOrderReq,
    placeOrderSuccess,
    placeOrderFail,
    orderDetailsReq,
    orderDetailsSuccess,
    orderDetailsFail,
    orderByIdReq,
    orderByIdSuccess,
    orderByIdFail,
    orderPaymentReq,
    orderPaymentSuccess,
    orderPaymentFail,
} from "../action-creators/orderActionCreators";
import { REMOVED_ALL_FROM_CART } from "../action-types/cartActionTypes";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const placeAnOrder = () => async (dispatch, getState) => {
    dispatch(placeOrderReq());

    const token = JSON.parse(localStorage.getItem("userData")).token;
    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const orderDataObj = {
            userId: getState().userSignIn.userData.userId,
            cartItems: getState().cart.cartItems,
            paymentMethod: getState().cart.paymentMethod,
            shippingAddress: getState().cart.shippingAddress,
        };

        const { data } = await axios.post(
            `${apiUrl}/checkout`,
            orderDataObj,
            config
        );

        if (data.success) {
            delete data["success"];
            delete data["status"];
            dispatch(placeOrderSuccess(data.data));
            dispatch({ type: REMOVED_ALL_FROM_CART });
            localStorage.removeItem("cartItems");
        } else if (data.status === 500) {
            dispatch({
                type: actions.PLACE_ORDER_FAILED,
                action: {
                    payload: {
                        errorMsg: data.message,
                    },
                },
            });
        }
    } catch (error) {
        dispatch(placeOrderFail(error));
    }
};

export const getOrderDetails = () => async (dispatch, getState) => {
    dispatch(orderDetailsReq());

    const token = JSON.parse(localStorage.getItem("userData")).token;
    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.get(
            `${apiUrl}/getmyorders/${getState().userSignIn.userData.userId}`,
            config
        );

        if (data.success) {
            dispatch(orderDetailsSuccess(data.orderData));
        }

        if (data.status === 404) {
            dispatch({
                type: actions.ORDER_DETAILS_FAILED,
                action: {
                    payload: {
                        errorMsg: data.message,
                    },
                },
            });
        }
    } catch (error) {
        dispatch(orderDetailsFail(error));
    }
};

export const getOrderDetailById = (orderId) => async (dispatch, getState) => {
    dispatch(orderByIdReq());

    const token = JSON.parse(localStorage.getItem("userData")).token;
    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.get(`${apiUrl}/order/${orderId}`, config);

        if (data.success) {
            dispatch(orderByIdSuccess(data.orderData));
        }

        if (data.status >= 400) {
            dispatch({
                type: actions.ORDER_DETAILS_FAILED,
                action: {
                    payload: {
                        errorMsg: data.message,
                    },
                },
            });
        }
    } catch (error) {
        dispatch(orderByIdFail(error));
    }
};

export const payOrder =
    (orderId, paymentResult) => async (dispatch, getState) => {
        dispatch(orderPaymentReq());

        const token = JSON.parse(localStorage.getItem("userData")).token;
        const config = {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await axios.put(
                `${apiUrl}/payorder/${orderId}`,
                paymentResult,
                config
            );

            if (data.success) {
                dispatch(orderPaymentSuccess(data.orderData));
            }

            if (data.status >= 400) {
                dispatch({
                    type: actions.ORDER_PAYMENT_FAILED,
                    action: {
                        payload: {
                            errorMsg: data.message,
                        },
                    },
                });
            }
        } catch (error) {
            dispatch(orderPaymentFail(error));
        }
    };
