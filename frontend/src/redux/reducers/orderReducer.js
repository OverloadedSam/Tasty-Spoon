import * as actions from "../action-types/OrderActionTypes";

let orderInitState = {
    loading: false,
    error: false,
    placedOrder: false,
    orderData: {},
};
export const orderReducer = (state = orderInitState, action) => {
    switch (action.type) {
        case actions.PLACE_ORDER_REQUESTED: {
            return {
                ...state,
                loading: true,
                error: false,
                placedOrder: false,
            };
        }

        case actions.PLACE_ORDER_SUCCEEDED: {
            return {
                loading: false,
                placedOrder: true,
                orderData: action.payload.data,
            };
        }

        case actions.PLACE_ORDER_FAILED: {
            return {
                loading: false,
                placedOrder: false,
                error: action.payload.errorMsg,
            };
        }
        case actions.PLACE_ORDER_RESET: {
            return {
                loading: false,
                error: false,
                placedOrder: false,
                orderData: {},
            };
        }

        default:
            return state;
    }
};

let orderDetailsInitState = { loading: false, error: false, orders: [] };
export const orderDetailsReducer = (state = orderDetailsInitState, action) => {
    switch (action.type) {
        case actions.ORDER_DETAILS_REQUESTED: {
            return { ...state, loading: true, error: false };
        }

        case actions.ORDER_DETAILS_SUCCEEDED: {
            return {
                loading: false,
                error: false,
                orders: [...action.payload.data],
            };
        }

        case actions.ORDER_DETAILS_FAILED: {
            return {
                loading: false,
                error: action.payload.errorMsg,
            };
        }

        default:
            return state;
    }
};

const orderByIdInitState = { loading: false, error: false, orderDetails: {} };
export const orderByIdReducer = (state = orderByIdInitState, action) => {
    switch (action.type) {
        case actions.ORDER_BY_ID_REQUESTED: {
            return { ...state, loading: true, error: false };
        }

        case actions.ORDER_BY_ID_SUCCEEDED: {
            return {
                loading: false,
                error: false,
                orderDetails: action.payload.data,
            };
        }

        case actions.ORDER_BY_ID_FAILED: {
            return {
                loading: false,
                error: action.payload.errorMsg,
            };
        }

        case actions.ORDER_BY_ID_RESET: {
            return {
                loading: false,
                error: false,
                orderDetails: {},
            };
        }

        default:
            return state;
    }
};

const orderPaymentInitState = { loading: false, error: false, success: false };
export const orderPaymentReducer = (state = orderPaymentInitState, action) => {
    switch (action.type) {
        case actions.ORDER_PAYMENT_REQUESTED: {
            return { ...state, loading: true, error: false };
        }

        case actions.ORDER_PAYMENT_SUCCEEDED: {
            return {
                loading: false,
                error: false,
                success: true,
            };
        }

        case actions.ORDER_PAYMENT_FAILED: {
            return {
                loading: false,
                error: action.payload.errorMsg,
                success: false,
            };
        }

        case actions.ORDER_PAYMENT_RESET: {
            return {
                loading: false,
                error: false,
                success: false,
            };
        }

        default:
            return state;
    }
};
