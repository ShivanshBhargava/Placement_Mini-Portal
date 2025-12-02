import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = () => {
    const { token, role } = useAuth();

    if (token) {
        const redirectPath = role === 'company' ? '/company-dashboard' : '/student-dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
