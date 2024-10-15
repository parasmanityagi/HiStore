import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

import backendURL from '../../utls/data'



// Helper function to store token in localStorage
const storeToken = (token) => {
  const now = new Date();
  const expiry = now.getTime() + 3600 * 1000; // 1 hour
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", expiry);
};

// Helper function to store encrypted user data with expiry
const storeUserData = (userData) => {
  const now = new Date();
  const expiry = now.getTime() + 3600 * 1000; // 1 hour
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), "secret-key").toString();
  localStorage.setItem("userInfo", encryptedData);
  localStorage.setItem("userExpiry", expiry);
};

// Login Action
export const login = createAsyncThunk("auth/login", async (data, { dispatch, rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await axios.post(`${backendURL}/api/user/login`, JSON.stringify(data), config);

    const token = res.data?.data?.token;
    // Store the token in localStorage
    storeToken(token);

    // After token is saved, call getUser to fetch user data
    dispatch(getUser());

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Signup Action
export const signup = createAsyncThunk("auth/signup", async (formData, { dispatch, rejectWithValue }) => {
  try {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    let res = await axios.post(`${backendURL}/api/user/signup`, data, config);

    const token = res.data.data.token;
    // Store the token in localStorage
    storeToken(token);

    // After token is saved, call getUser to fetch user data
    dispatch(getUser());

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



// Update User Action
export const updateUser = createAsyncThunk("auth/update-user", async (formData, { dispatch, rejectWithValue }) => {
  try {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };

    let res = await axios.put(`${backendURL}/api/user/update-user`, data, config);

    // call getUser to fetch user data
    dispatch(getUser());

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Update User Action
export const deleteUser = createAsyncThunk("auth/delete-user", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    // Use axios.delete instead of axios.put
    const res = await axios.delete(`${backendURL}/api/user/delete-user`, config);

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});



// Get User Action
export const getUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(`${backendURL}/api/user/get-user`, config);
    const userData = res.data;

    // Encrypt and store user data with expiry
    storeUserData(userData);

    return userData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
