import { createSlice } from '@reduxjs/toolkit';

import { addToWishlist, getWishlist, removeFromWishlist } from './wishlistActions.js';

const initialState = {
    loading: false,
    wishlist: [],
    message: null,
    error: null,
    success: false,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // Action to reset the wishlist state
        resetWishlistState(state) {
            state.loading = false;
            state.wishlist = null;
            state.error = null;
            state.success = false;
            state.message = "User is not Logged In";
        }
    },
    extraReducers: (builder) => {
        builder
            // Handling getWishlist actions
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.wishlist = action.payload.data;
                state.error = null;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            })

            // Handling removeFromWishlist actions
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            })

            // Handling addToWishlist actions
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            });
    },
});

// Export the resetWishlistState action so it can be dispatched manually
export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
