import * as actions from "../action-types/cartActionTypes";

export const addToCartReq = () => {
    return { type: actions.ADD_TO_CART_REQUESTED };
};

export const addToCartSuccess = (data) => {
    return {
        type: actions.ADDED_TO_CART,
        payload: {
            data,
        },
    };
};

export const addToCartFail = (error) => {
    return {
        type: actions.ADDED_TO_CART_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const removeFromCartSuccess = (filteredItems) => {
    return {
        type: actions.REMOVED_FROM_CART,
        payload: {
            data: filteredItems,
        },
    };
};

export const removeFromCartFail = (error) => {
    return {
        type: actions.REMOVED_FROM_CART,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
