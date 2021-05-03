import {
    productCategoriesRequested,
    productCategoriesSucceeded,
    productCategoriesFailed,
} from "../action-creators/categoryActionCreator";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const listProductCategory = (productType) => async (dispatch) => {
    let products;
    try {
        dispatch(productCategoriesRequested());

        if (productType === "food") {
            const { data } = await axios.get(`${apiUrl}/foodcategory`);
            products = data;
        } else if (productType === "grocery") {
            const { data } = await axios.get(`${apiUrl}/grocerycategory`);
            products = data;
        } else throw new Error("product category failed to fetch!");
        if (products.success) {
            dispatch(productCategoriesSucceeded(products.data));
        } else throw new Error("product category failed to fetch!");
    } catch (error) {
        dispatch(productCategoriesFailed(error));
    }
};
