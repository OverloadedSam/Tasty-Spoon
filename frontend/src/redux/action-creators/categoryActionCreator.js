import * as actions from "../action-types/categoryActionTypes";

export const productCategoriesRequested = () => {
    return {
        type: actions.PROD_CATEGORIES_REQUESTED,
    };
};

export const productCategoriesSucceeded = (data) => {
    return {
        type: actions.PROD_CATEGORIES_SUCCEEDED,
        payload: {
            data,
        },
    };
};

export const productCategoriesFailed = (error) => {
    return {
        type: actions.PROD_CATEGORIES_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
