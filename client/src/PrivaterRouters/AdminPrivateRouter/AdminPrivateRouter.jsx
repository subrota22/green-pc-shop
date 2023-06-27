import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import useAdmin from '../../hooks/useAdmin';

import { AuthProvider } from '../../UserContext/UserContext';

const AdminPrivateRouter = ({children}) => {
const {user} = useContext(AuthProvider) ;
const [isAdmin , adminLoading] = useAdmin(user?.email) ;
if(adminLoading){
return (
<>
<HashLoader style={{margin:"20% 50%"}} color="#DE1068"></HashLoader>
</>)
}

if(user.uid && isAdmin ) {
return children ;
}
return <Navigate to="/"></Navigate>
};

export default AdminPrivateRouter;