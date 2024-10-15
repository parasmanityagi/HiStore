import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";


import backendURL from '../../utls/data'

const initialState = {
    loading: false,
    products: [],
    error: null,
    success: false,
    message: null
};


// Get All Products 
export const getAllProducts = createAsyncThunk("auth/get-all-products", async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
            },
        };

        const res = await axios.get(`${backendURL}/api/products/get-all-products`, config);
        const productData = res.data;

        // Encrypt and store user data with expiry
        // storeUserData(userData);
        return productData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Handling getAllProducts actions
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
                state.success = false;
            });
    },
});


export default authSlice.reducer;
