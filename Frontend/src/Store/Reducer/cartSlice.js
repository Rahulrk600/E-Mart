import { createSlice } from '@reduxjs/toolkit'

const getLocalCartData = () => {
    let newCart = localStorage.getItem("cartItems")
    return newCart ? JSON.parse(newCart) : [];
}

const initialState = {
    cartItems: getLocalCartData(),
    totalQuantity: 0,
    totalAmount: 0,

};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;
            const isItem = state.cartItems.find(
                (cartItem) => cartItem.product === item.product
            );

            if (isItem) {
                if (isItem.quantity < item.stock) {
                    isItem.quantity += 1;
                    //isItem.totalPrice += item.price
                }
            } else {
                state.cartItems.push({
                    ...item,

                    // totalPrice: item.price
                });
            }
            //  state.totalQuantity += 1
            // state.totalAmount += item.price

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeItemFormCrt: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.item = [];
             state.totalQuantity =0
             state.totalAmount = 0
             localStorage.removeItem('cartItems')
         }

    }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItemFormCrt, clearCart } = cartSlice.actions;
export default cartSlice.reducer;