import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Pages/Loading/Loading';
import { Navigate } from 'react-router';

const AdminRoutes = ({children}) => {
    const {user , loading} = useAuth();
    const {isAdmin , isLoading} = useUserRole();

    if(loading || isLoading){
        return <Loading></Loading>
    }
    if(!isAdmin || !user){
        return <Navigate to='/forbidden'></Navigate>
    }
    return children;
};

export default AdminRoutes;