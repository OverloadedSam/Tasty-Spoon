import * as actions from "../action-types/cartActionTypes";

let cartInitState = { loading: false, cartItems: [] };
export const cartReducer = (state = cartInitState, action) => {
    switch (action.type) {
        case actions.ADD_TO_CART_REQUESTED: {
            return { loading: true, cartItems: [...state.cartItems] };
        }

        case actions.ADDED_TO_CART: {
            const itemExist = state.cartItems.find(
                (product) => product.prodId === action.payload.data.prodId
            );

            if (itemExist && itemExist.qty !== action.payload.data.qty) {
                return {
                    loading: false,
                    cartItems: state.cartItems.map((item) => {
                        if (item.prodId === action.payload.data.prodId) {
                            return { ...item, qty: action.payload.data.qty };
                        }
                        return item;
                    }),
                };
            }

            if (itemExist) {
                return { loading: false, cartItems: [...state.cartItems] };
            }

            return {
                loading: false,
                cartItems: [...state.cartItems, action.payload.data],
            };
        }

        case actions.REMOVED_FROM_CART: {
            return { loading: false, cartItems: [...action.payload.data] };
        }

        case actions.REMOVED_ALL_FROM_CART: {
            return { loading: false, cartItems: [] };
        }

        default:
            return state;
    }
};
