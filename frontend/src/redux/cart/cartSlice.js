import { createSlice } from '@reduxjs/toolkit';

import { addToCart, getCart, removeFromCart } from './cartActions.js'

const initialState = {
    loading: false,
    cart: [],
    message: null,
    error: null,
    success: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Action to reset the cart state
        resetCartState(state) {
            state.loading = false;
            state.cart = null;
            state.error = null;
            state.success = false;
            state.message = "User is not Logged In";
        }
    },
    extraReducers: (builder) => {
        builder
            // Handling getCart actions
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.cart = action.payload.data;
                state.error = null;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            })

            // Handling removeFromCart actions
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            })

            // Handling addToCart actions
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            });
    },
});

// Export the resetCartState action so it can be dispatched manually
export const { resetCartState } = cartSlice.actions;


export default cartSlice.reducer;
