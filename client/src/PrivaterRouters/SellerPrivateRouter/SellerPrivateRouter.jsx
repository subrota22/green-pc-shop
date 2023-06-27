import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import useSeller from '../../hooks/useSeller';
import { AuthProvider } from '../../UserContext/UserContext';

const SellerPrivateRouter = ({children}) => {
const {user} = useContext(AuthProvider) ;
const [isSeller , sellerLoading] = useSeller(user?.email) ;
if(sellerLoading){
return (
<>
<HashLoader style={{margin:"20% 50%"}} color="#DE1068"></HashLoader>
</>)
}

if(user.uid && isSeller ) {
return children ;
}
return <Navigate to="/"></Navigate>
};

export default SellerPrivateRouter;