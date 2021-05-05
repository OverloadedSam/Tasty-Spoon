import * as actions from "../action-types/favouriteActionTypes";

const favouritesInitState = {
    loading: false,
    error: false,
    items: [],
    isAdded: false,
    isRemoved: false,
};

export const favouriteReducer = (state = favouritesInitState, action) => {
    switch (action.type) {
        // ***Get favourites***
        case actions.FAV_ITEM_REQUESTED:
            return { ...state, loading: true, error: false, items: [] };

        case actions.FAV_ITEM_SUCCEEDED:
            return {
                ...state,
                loading: false,
                error: false,
                items: action.payload.data,
            };

        case actions.FAV_ITEM_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMsg,
                items: null,
            };

        // ***Add to favourites***
        case actions.ADD_TO_FAV_REQUESTED:
            return { loading: true, error: false, isAdded: false };

        case actions.ADD_TO_FAV_SUCCEEDED:
            return {
                loading: false,
                error: false,
                isAdded: true,
                items: action.payload.data,
            };

        case actions.ADD_TO_FAV_FAILED:
            return {
                loading: false,
                error: action.payload.errorMsg,
                isAdded: false,
            };

        // ***Remove from favourites***
        case actions.REMOVE_FROM_FAV_REQUESTED:
            return { ...state, loading: true, error: false, isRemoved: false };

        case actions.REMOVE_FROM_FAV_SUCCEEDED:
            return {
                loading: false,
                error: false,
                isRemoved: true,
                items: action.payload.data,
            };

        case actions.REMOVE_FROM_FAV_FAILED:
            return {
                loading: false,
                error: action.payload.errorMsg,
                isRemoved: true,
            };

        default:
            return state;
    }
};
