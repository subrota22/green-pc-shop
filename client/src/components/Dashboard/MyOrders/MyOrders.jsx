import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';
import { Typewriter } from 'react-simple-typewriter' ;
const MyOrders = () => {
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const email = user?.email;
    
const { data: orders = [email], isLoading  } = useQuery({
    queryKey: ['sellers'],
    queryFn: () =>
        fetch(`https://computer-sell.vercel.app/orders/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate("/login");
                }
                return res.json()
            }
            )
            .then(data => data)
})


if (isLoading) {
    return (
        <>
            <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
        </>
    )
}

//My order page
    return (
        <>
            <Helmet><title>My orders</title></Helmet>
            <h2 className='text-center text-2xl font-bold my-5 text-info'>  Total {orders?.length ? orders?.length : "0"} orders success  </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-5 gap-4">
                {
                    orders.map(order =>
                        <div className="card w-96 cardbackground shadow-xl" key={order._id}>
                            <figure><img src={order.productImage}  className='h-96' alt={order.productName} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Product name : {order.productName}</h2>
                                <h2 className="card-title">Price: ${order.ProductPrice}</h2>
                                <p> Description : {order.description}</p>
                                <p>Price ${order.ProductPrice}</p>
                                <p>Seller phone number : {order.phoneNumber}</p>
                                <p>Seller email: {order.sellerEmail}</p>
                               
                                <div className="flex justify-start">
                                    <div>
                                        <p className='mt-4 mx-4  '>Seller Profile Image : </p>
                                    </div>
                                    <div>
                                        <img src={order.sellerProfile} alt={order.sellerName}
                                            className="h-14 w-14  rounded-full animate-pulse border-2 border-primary" />
                                    </div>

                                </div>


                                <div className="card-actions justify-end mt-5">
                                    {
                                        order.paid !== true ?
                                            <NavLink to={`/payments/${order._id}`}>
                                                <button className="btn btn-primary w-32" >
                                                    Pay
                                                </button>
                                            </NavLink>
                                            :
                                            <button className="btn btn-success text-white w-32" >
                                                Paid
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                orders?.length === 0 &&
                
                <h2 className='text-2xl font-bold'>
                        <Typewriter
                        words={['Please add some' , 'orders to see your ', 'my orders page' ]}
                        loop={Infinity}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
            
                        </h2>
         }
        </>
    );
};

export default MyOrders;