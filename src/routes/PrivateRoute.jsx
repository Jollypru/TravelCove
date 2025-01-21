import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        <p className='text-center'><span className="loading loading-ring loading-lg"></span></p>
    }
    if(user) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}}></Navigate>
};

export default PrivateRoute;