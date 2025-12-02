import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = () => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/company-dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
