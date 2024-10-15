import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import backendURL from '../../utls/data.js'

// Add To Wishlist Action
export const addToWishlist = createAsyncThunk("wishlist/add", async (data, { dispatch, rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        };
        let res = await axios.post(`${backendURL}/api/wishlist/add`, JSON.stringify(data), config);
        dispatch(getWishlist());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Remove From Wishlist Action
export const removeFromWishlist = createAsyncThunk("wishlist/remove", async (id, { dispatch, rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        };
        let res = await axios.delete(`${backendURL}/api/wishlist/remove/${id}`, config);
        dispatch(getWishlist());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



// Get Wishlist Action
export const getWishlist = createAsyncThunk("auth/getWishlist", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': "Application/json",
                Authorization: token,
            },
        };

        const res = await axios.get(`${backendURL}/api/wishlist`, config);
        const wishlistData = res.data;

        return wishlistData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
