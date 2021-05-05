import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
    userSignInReducer,
    userSignUpReducer,
    userDetailsReducer,
    userProfileUpdateReducer,
} from "./reducers/userReducer";
import {
    orderReducer,
    orderDetailsReducer,
    orderByIdReducer,
    orderPaymentReducer,
} from "./reducers/orderReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { favouriteReducer } from "./reducers/favouriteReducer";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderDetailsById: orderByIdReducer,
    orderPayment: orderPaymentReducer,
    category: categoryReducer,
    favourites: favouriteReducer,
});

const middleware = [thunk];

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userDataFromLocalStorage = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

const addressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: addressFromLocalStorage,
        paymentMethod: paymentMethodFromLocalStorage,
    },
    userSignIn: {
        userData: userDataFromLocalStorage,
        isSignedIn: Boolean(userDataFromLocalStorage),
    },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
