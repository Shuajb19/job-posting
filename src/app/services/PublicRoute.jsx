import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const PublicRoute = ({children}) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <Navigate to="/jobs" replace/> : children;
};

export default PublicRoute; 