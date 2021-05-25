import * as actions from "../action-types/productActionTypes";

const prodListInitState = { products: [], loading: false, error: false, count: 0 };
export const productListReducer = (state = prodListInitState, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUESTED:
            return { ...state, loading: true };

        case actions.PRODUCT_LIST_SUCCEEDED:
            return { ...state, loading: false, products: action.payload.data, count: action.payload.count};

        case actions.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload.errorMsg };

        default:
            return state;
    }
};

const prodDetailInitState = { loading: false, error: false, product: {} };
export const productDetailsReducer = (state = prodDetailInitState, action) => {
    switch (action.type) {
        case actions.PRODUCT_DETAILS_REQUESTED:
            return { ...state, loading: true };

        case actions.PRODUCT_DETAILS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                product: action.payload.data,
            };

        case actions.PRODUCT_DETAILS_FAILED:
            return { ...state, loading: false, error: action.payload.errorMsg };

        default:
            return state;
    }
};
