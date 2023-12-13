// src/redux/reducers.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
} from "./actions";

const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const productToAdd = action.payload;
            const existingProductIndex = state.cart.findIndex(
                (item) => item.id === productToAdd.id
            );

            if (existingProductIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingProductIndex].quantity += 1;
                return { ...state, cart: updatedCart };
            } else {
                productToAdd.quantity = 1;
                return { ...state, cart: [...state.cart, productToAdd] };
            }

        case REMOVE_FROM_CART:
            const productIdToRemove = action.payload;
            const updatedCart = state.cart.filter(
                (item) => item.id !== productIdToRemove
            );
            return { ...state, cart: updatedCart };

        case UPDATE_CART_ITEM_QUANTITY:
            const { productId, quantity } = action.payload;
            const updatedCartWithQuantity = state.cart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(0, quantity) }
                    : item
            );
            return { ...state, cart: updatedCartWithQuantity };

        default:
            return state;
    }
};

export default cartReducer;
