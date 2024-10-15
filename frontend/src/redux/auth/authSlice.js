import { createSlice } from '@reduxjs/toolkit';


import { signup, login, getUser, deleteUser } from './authActions.js';

const initialState = {
    loading: false,
    userInfo: null, 
    userToken: null, 
    error: null,
    success: false, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to directly set user info if loaded from localStorage
        setUserInfo(state, action) {
            state.userInfo = action.payload;
            state.success = true;
        },

        // Action to directly set token if loaded from localStorage
        setUserToken(state, action) {
            state.userToken = action.payload;
        },

        // Action to reset the auth state
        resetAuthState(state) {
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
        }
    },
    
    extraReducers: (builder) => {
        builder
            // Handling signup actions
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.userToken = action.payload.data.token;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Handling login actions
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.userToken = action.payload.data.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Handling delete user actions
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = null;

                // Reset user data upon successful deletion
                if (action.payload.success) {
                    state.userToken = null;
                    state.userInfo = null;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })


            // Handling getUser actions
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.userInfo = action.payload.data;
                state.message = action.payload.message; 
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

// Export the setUserInfo action so it can be dispatched manually
export const { setUserInfo, setUserToken, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
