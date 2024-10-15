import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { userToken } = useSelector((state) => state.auth);

    return userToken ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;