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

export const prodDetailReq = () => {
    return {
        type: actions.PRODUCT_DETAILS_REQUESTED,
    };
};

export const prodDetailSuccess = (data) => {
    return {
        type: actions.PRODUCT_DETAILS_SUCCEEDED,
        payload: { data },
    };
};

export const prodDetailFail = (error) => {
    return {
        type: actions.PRODUCT_DETAILS_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
