import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/login' state={{from : location.pathname}}></Navigate>
    }
    else{
        return children;
    }
};

export default PrivateRoutes;