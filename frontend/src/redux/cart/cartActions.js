import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import backendURL from '../../utls/data.js'


// Remove From Cart Action
export const addToCart = createAsyncThunk("cart/add", async (data, { dispatch, rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        };
        let res = await axios.post(`${backendURL}/api/cart/add`, JSON.stringify(data), config);
        dispatch(getCart());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Remove From Cart Action
export const removeFromCart = createAsyncThunk("cart/remove", async (id, { dispatch, rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        };
        let res = await axios.delete(`${backendURL}/api/cart/remove/${id}`, config);
        dispatch(getCart());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Get User Action
export const getCart = createAsyncThunk("auth/getCart", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type':"Application/json",
                Authorization: token,
            },
        };

        const res = await axios.get(`${backendURL}/api/cart`, config);
        const cartData = res.data;
        
        return cartData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
