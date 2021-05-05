import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userSignInReducer, userSignUpReducer } from "./reducers/userReducer";
import { orderReducer, orderDetailsReducer} from './reducers/orderReducer';
import { categoryReducer } from "./reducers/categoryReducer";
import { favouriteReducer } from "./reducers/favouriteReducer";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    category: categoryReducer,
    favourites: favouriteReducer
});

const middleware = [thunk];

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userDataFromLocalStorage = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
    },
    userSignIn: {
        userData: userDataFromLocalStorage,
        isSignedIn: Boolean(userDataFromLocalStorage)
    },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
