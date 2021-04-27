import * as actions from "../action-types/userActionTypes";

const userSignInInitState = {
    loading: false,
    error: false,
    isSignedIn: false,
    userData: {},
};
export const userSignInReducer = (state = userSignInInitState, action) => {
    switch (action.type) {
        case actions.USER_SIGN_IN_REQUESTED:
            return { loading: true, userData: {} };

        case actions.USER_SIGN_IN_SUCCEEDED:
            return {
                loading: false,
                isSignedIn: true,
                userData: action.payload.userInfo,
            };

        case actions.USER_SIGN_IN_FAILED:
            return {
                loading: false,
                isSignedIn: false,
                error: action.payload.errorMsg,
                wrongEmail: action.payload.wrongEmail,
                wrongPass: action.payload.wrongPass,
            };

        case actions.USER_SIGN_OUT_SUCCEEDED:
            return { isSignedIn: false, userData: null };

        default:
            return state;
    }
};
