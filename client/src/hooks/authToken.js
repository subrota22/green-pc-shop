
const authToken = (email) => {
const currentUser = {
email:email , 
}
fetch(`https://computer-sell.vercel.app/jwt` , {
method:"POST" ,
headers:{
"Content-Type" : "application/json"
} ,
body:JSON.stringify(currentUser)  , 
}) 
.then(res => res.json()) 
.then(data => localStorage.setItem("pc-shop-only" , data.token ))
};

export default authToken;