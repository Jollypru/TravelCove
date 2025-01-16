import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user} = useAuth();

    if(user.role === 'admin'){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;

