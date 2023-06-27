import React from 'react';
import { useState } from 'react';

const useSeller = (email) => {
const [isSeller , setIsSeller] = useState(false) ;
const [sellerLoading , SetSellerLoading] = useState(true) ;
React.useEffect(() => {
if(email){
fetch(`https://computer-sell.vercel.app/users/sellers/${email}`) 
.then(res => res.json())
.then(data => {
if(data.isSeller){
SetSellerLoading(false) ; 
return setIsSeller(true) ;
}
}) 
} 

}, [email]);

return [isSeller , sellerLoading] ; 
};

export default useSeller