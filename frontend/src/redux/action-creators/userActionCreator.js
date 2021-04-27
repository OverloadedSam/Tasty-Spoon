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
