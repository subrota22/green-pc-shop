import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import useBuyer from '../../hooks/useBuyer';
import { AuthProvider } from '../../UserContext/UserContext';

const BuyerPrivateRouter = ({children}) => {
const {user} = useContext(AuthProvider) ;
const [isBuyer , buyerLoading] = useBuyer(user?.email) ;
if(buyerLoading){
return (
<>
<HashLoader style={{margin:"20% 50%"}} color="#DE1068"></HashLoader>
</>)
}

if(user.uid && isBuyer ) {
return children ;
}
return <Navigate to="/"></Navigate>
};

export default BuyerPrivateRouter;