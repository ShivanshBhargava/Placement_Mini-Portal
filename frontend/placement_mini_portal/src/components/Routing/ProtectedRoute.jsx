import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/Login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        const redirectPath = role === 'company' ? '/company-dashboard' : '/student-dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
