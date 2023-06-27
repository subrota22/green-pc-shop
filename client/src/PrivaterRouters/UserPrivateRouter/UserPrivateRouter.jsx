import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from '../../UserContext/UserContext';

const UserPrivateRouter = ({children}) => {
 const {user} = useContext(AuthProvider) ;
 if(user && user.uid ) {
    return (
        <>
            {children}
        </>
    );
 } else {
return <Navigate to="/"></Navigate>
 }
};

export default UserPrivateRouter;