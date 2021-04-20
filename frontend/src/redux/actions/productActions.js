import {
    prodListReq,
    prodListSuccess,
    prodListFail,
} from "../action-creators/productActionCreator";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Listing of all the products
export const listProducts = () => async (dispatch) => {
    try {
        dispatch(prodListReq());

        let { data } = await axios.get(`${apiUrl}/products/`);
        data = data.data;

        dispatch(prodListSuccess(data));
    } catch (error) {
        dispatch(prodListFail(error));
    }
};
