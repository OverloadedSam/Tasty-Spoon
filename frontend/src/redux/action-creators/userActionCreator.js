import * as actions from "../action-types/userActionTypes";

export const userSignInReq = () => {
    return { type: actions.USER_SIGN_IN_REQUESTED };
};

export const userSignInSuccess = (data) => {
    return {
        type: actions.USER_SIGN_IN_SUCCEEDED,
        payload: {
            userInfo: data,
        },
    };
};

export const userSignInFail = (data, userPayload) => {
    return {
        type: actions.USER_SIGN_IN_FAILED,
        payload: {
            errorMsg: data.message,
            wrongEmail: userPayload.email,
            wrongPass: userPayload.password,
        },
    };
};

export const userSignOutSuccess = () => {
    return { type: actions.USER_SIGN_OUT_SUCCEEDED };
};

export const userSignUpReq = () => {
    return { type: actions.USER_SIGN_UP_REQUESTED };
};

export const userSignUpSuccess = (data) => {
    return {
        type: actions.USER_SIGN_UP_SUCCEEDED,
        payload: {
            userData: data,
        },
    };
};

export const userSignUpFail = (error) => {
    return {
        type: actions.USER_SIGN_UP_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const userDetailsReq = () => {
    return {
        type: actions.USER_DETAILS_REQUESTED,
    };
};

export const userDetailsSuccess = (data) => {
    return {
        type: actions.USER_DETAILS_SUCCEEDED,
        payload: {
            data,
        },
    };
};

export const userDetailsFail = (error) => {
    return {
        type: actions.USER_DETAILS_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};

export const userProfileUpdateReq = () => {
    return {
        type: actions.USER_PROFILE_UPDATE_REQUESTED,
    };
};

export const userProfileUpdateSuccess = (data) => {
    return {
        type: actions.USER_PROFILE_UPDATE_SUCCEEDED,
        payload: {
            data,
        },
    };
};

export const userProfileUpdateFail = (error) => {
    return {
        type: actions.USER_PROFILE_UPDATE_FAILED,
        payload: {
            errorMsg:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        },
    };
};
