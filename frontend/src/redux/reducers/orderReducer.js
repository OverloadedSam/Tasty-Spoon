import * as actions from "../action-types/OrderActionTypes";

let orderInitState = {
    loading: false,
    error: false,
    placedOrder: false,
    orderedItems: [],
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
                orderedItems: [...state.orderedItems, action.payload.data],
            };
        }

        case actions.PLACE_ORDER_FAILED: {
            return {
                loading: false,
                placedOrder: false,
                error: action.payload.errorMsg,
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
