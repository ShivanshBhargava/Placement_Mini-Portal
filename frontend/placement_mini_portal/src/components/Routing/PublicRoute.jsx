import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = () => {
    const { token } = useAuth();

    if (token) {
        // Redirect to dashboard if already logged in
        // You might want to differentiate between student and company dashboards here if you have that info
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
