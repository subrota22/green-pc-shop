import React from 'react';
import { useState } from 'react';

const useBuyer = (email) => {
const [isBuyer , setIsBuyer] = useState(false) ;
const [buyerLoading , SetBuyerLoading] = useState(true) ;
React.useEffect(() => {
if(email){
fetch(`https://computer-sell.vercel.app/users/buyers/${email}`) 
.then(res => res.json())
.then(data => {
if(data.isBuyer){
SetBuyerLoading(false) ; 
return setIsBuyer(true) ;
}
}) 
} 

}, [email]);

return [isBuyer , buyerLoading] ; 
};

export default useBuyer