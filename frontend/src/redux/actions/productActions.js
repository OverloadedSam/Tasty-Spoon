import {
    prodListReq,
    prodListSuccess,
    prodListFail,
    prodDetailReq,
    prodDetailSuccess,
    prodDetailFail,
} from "../action-creators/productActionCreator";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Listing of all the products
export const listProducts = (type, url) => async (dispatch) => {
    try {
        dispatch(prodListReq());
        let response;

        if (type === "meals") {
            response = await axios.get(`${apiUrl}/${url}`);
        }
        if (type === "groceries") {
            response = await axios.get(`${apiUrl}/${url}`);
        }

        dispatch(prodListSuccess(response.data));
    } catch (error) {
        dispatch(prodListFail(error));
    }
};

// Details of an product based on id
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(prodDetailReq());

        let { data } = await axios.get(`${apiUrl}/product/${id}`);
        data = data.productData;

        dispatch(prodDetailSuccess(data));
    } catch (error) {
        dispatch(prodDetailFail(error));
    }
};
