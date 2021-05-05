import axios from "axios";
import * as actions from "../action-types/userActionTypes";
import {
    userSignInFail,
    userSignInSuccess,
    userSignInReq,
    userSignOutSuccess,
    userSignUpReq,
    userSignUpSuccess,
    userSignUpFail,
    userDetailsReq,
    userDetailsSuccess,
    userDetailsFail,
    userProfileUpdateReq,
    userProfileUpdateSuccess,
    userProfileUpdateFail
} from "../action-creators/userActionCreator";

export const signIn = (userPayload) => async (dispatch) => {
    try {
        dispatch(userSignInReq());

        const config = {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/signin`,
            JSON.stringify(userPayload),
            config
        );

        if (data.success) {
            delete data["success"];
            delete data["message"];
            dispatch(userSignInSuccess(data));
            localStorage.setItem("userData", JSON.stringify(data));
        } else {
            dispatch(userSignInFail(data, userPayload));
        }
    } catch (error) {
        dispatch({
            type: actions.USER_SIGN_IN_FAILED,
            payload: {
                errorMsg:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
                wrongEmail: userPayload.email,
                wrongPass: userPayload.password,
            },
        });
    }
};

export const signOut = () => (dispatch) => {
    dispatch(userSignOutSuccess());
    localStorage.removeItem("userData");
};

export const signUp = (userPayload) => async (dispatch) => {
    dispatch(userSignUpReq());

    const config = {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    };

    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/register`,
            userPayload,
            config
        );
        if (data.status === 201) {
            dispatch(userSignUpSuccess(data));

            try {
                // Sign in requset after successful registration.
                dispatch(userSignInReq());

                const { data: signInData } = await axios.post(
                    `${process.env.REACT_APP_API_URL}/signin`,
                    JSON.stringify({
                        email: userPayload.email,
                        password: userPayload.password,
                    }),
                    config
                );

                if (signInData.success) {
                    delete signInData["success"];
                    delete signInData["message"];
                    dispatch(userSignInSuccess(signInData));
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(signInData)
                    );
                }
            } catch (error) {
                dispatch({
                    type: actions.USER_SIGN_IN_FAILED,
                    payload: {
                        errorMsg:
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : error.message,
                        wrongEmail: userPayload.email,
                        wrongPass: userPayload.password,
                    },
                });
            }
        } else if (data.status === 406) {
            dispatch({
                type: actions.USER_SIGN_UP_FAILED,
                action: {
                    payload: {
                        errorMsg: data.message,
                    },
                },
            });
        }
    } catch (error) {
        dispatch(userSignUpFail(error));
    }
};

export const getUserDetails = () => async (dispatch, getState) => {
    dispatch(userDetailsReq());

    const token =
        getState().userSignIn.userData.token ||
        JSON.parse(localStorage.getItem("userData")).token;

    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/me`,
            config
        );
        dispatch(userDetailsSuccess(data.data));
    } catch (error) {
        dispatch(userDetailsFail(error));
    }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
    dispatch(userProfileUpdateReq());

    const token =
        getState().userSignIn.userData.token ||
        JSON.parse(localStorage.getItem("userData")).token;

    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/me`,
            userData,
            config
        );
        dispatch(userProfileUpdateSuccess(data.updatedData));
    } catch (error) {
        dispatch(userProfileUpdateFail(error));
    }
};
