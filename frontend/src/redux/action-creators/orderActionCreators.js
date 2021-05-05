import * as actions from "../action-types/OrderActionTypes";

export const placeOrderReq = () => {
    return { type: actions.PLACE_ORDER_REQUESTED };
};

export const placeOrderSuccess = (data) => {
    return {
        type: actions.PLACE_ORDER_SUCCEEDED,
        payload: {
            data: data,
        },
    };
};

export const placeOrderFail = (error) => {
    return {
        type: actions.PLACE_ORDER_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const orderDetailsReq = () => {
    return { type: actions.ORDER_DETAILS_REQUESTED };
};

export const orderDetailsSuccess = (data) => {
    return {
        type: actions.ORDER_DETAILS_SUCCEEDED,
        payload: {
            data: data,
        },
    };
};

export const orderDetailsFail = (error) => {
    return {
        type: actions.ORDER_DETAILS_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const orderByIdReq = () => {
    return { type: actions.ORDER_BY_ID_REQUESTED };
};

export const orderByIdSuccess = (data) => {
    return {
        type: actions.ORDER_BY_ID_SUCCEEDED,
        payload: {
            data: data,
        },
    };
};

export const orderByIdFail = (error) => {
    return {
        type: actions.ORDER_BY_ID_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const orderPaymentReq = () => {
    return { type: actions.ORDER_PAYMENT_REQUESTED };
};

export const orderPaymentSuccess = (data) => {
    return {
        type: actions.ORDER_PAYMENT_SUCCEEDED,
        payload: {
            data: data,
        },
    };
};

export const orderPaymentFail = (error) => {
    return {
        type: actions.ORDER_PAYMENT_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
