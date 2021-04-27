import axios from "axios";
import * as actions from "../action-types/userActionTypes";
import {
    userSignInFail,
    userSignInSuccess,
    userSignInReq,
    userSignOutSuccess,
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
