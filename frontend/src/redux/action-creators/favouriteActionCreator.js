import * as actions from "../action-types/favouriteActionTypes";

// *** Get favourites ***
export const favItemReq = () => {
    return { type: actions.FAV_ITEM_REQUESTED };
};

export const favItemSuccess = (data) => {
    return {
        type: actions.FAV_ITEM_SUCCEEDED,
        payload: {
            data,
        },
    };
};

export const favItemFail = (error) => {
    return {
        type: actions.FAV_ITEM_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

// *** Add to favourites ***
export const addToFavReq = (prodId) => {
    return {
        type: actions.ADD_TO_FAV_REQUESTED,
        payload: {
            reqItem: prodId,
        },
    };
};

export const addToFavSuccess = (data) => {
    return {
        type: actions.ADD_TO_FAV_SUCCEEDED,
        payload: {
            data: data.favouriteItems,
        },
    };
};

export const addToFavFail = (error) => {
    return {
        type: actions.ADD_TO_FAV_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

// *** Remove from favourites ***
export const removeFromFavReq = () => {
    return { type: actions.REMOVE_FROM_FAV_REQUESTED };
};

export const removeFromFavSuccess = (data) => {
    return {
        type: actions.REMOVE_FROM_FAV_SUCCEEDED,
        payload: {
            data,
        },
    };
};

export const removeFromFavFail = (error) => {
    return {
        type: actions.REMOVE_FROM_FAV_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
