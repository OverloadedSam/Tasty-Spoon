import * as actions from "../action-types/categoryActionTypes";

const categoryInitState = { loading: false, error: false, categories: [] };

export const categoryReducer = (state = categoryInitState, action) => {
    switch (action.type) {
        case actions.PROD_CATEGORIES_REQUESTED:
            return { loading: true, error: false, categories: [] };

        case actions.PROD_CATEGORIES_SUCCEEDED:
            return {
                loading: false,
                error: false,
                categories: action.payload.data,
            };

        case actions.PROD_CATEGORIES_FAILED:
            return {
                loading: false,
                error: action.payload.errorMsg
            }
        default:
            return state;
    }
};
