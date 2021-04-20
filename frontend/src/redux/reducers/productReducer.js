import * as actions from "../action-types/productActionTypes";

const prodListInitState = { products: [], loading: false, error: false };
export const productListReducer = (state = prodListInitState, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUESTED:
            return { ...state, loading: true };

        case actions.PRODUCT_LIST_SUCCEEDED:
            return { ...state, loading: false, products: action.payload.data };

        case actions.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload.errorMsg };

        default:
            return state;
    }
};
