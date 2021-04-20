import * as actions from "../action-types/productActionTypes";

export const prodListReq = () => {
    return {
        type: actions.PRODUCT_LIST_REQUESTED,
    };
};

export const prodListSuccess = (data) => {
    return {
        type: actions.PRODUCT_LIST_SUCCEEDED,
        payload: { data },
    };
};

export const prodListFail = (error) => {
    return {
        type: actions.PRODUCT_LIST_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
