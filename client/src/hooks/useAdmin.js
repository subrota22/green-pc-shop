import React from 'react';
import { useState } from 'react';

const useAdmin = (email) => {
const [isAdmin , setIsAdmin] = useState(false) ;
const [adminLoading , SetAdminLoading] = useState(true) ;
React.useEffect(() => {
if(email){
fetch(`https://computer-sell.vercel.app/users/admin/${email}`) 
.then(res => res.json())
.then(data => {
if(data.isAdmin){
SetAdminLoading(false) ; 
return setIsAdmin(true) ;
}
}) 
} 

}, [email]);

return [isAdmin , adminLoading] ; 
};

export default useAdmin