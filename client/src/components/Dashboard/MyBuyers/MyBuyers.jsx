import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';

const MyBuyers = () => {
    const { currentUser } = useContext(AuthProvider);
    const email = currentUser.email;
    const navigate = useNavigate();
    const { data: myTotalBuyers = [email], isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: () =>
            fetch(`https://computer-sell.vercel.app/myBuyers/${email}`, {
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

    return (
        <>
            <Helmet><title>My buyers </title></Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 mx-2 gap-10">
                {
                    myTotalBuyers.map(buyer =>
                        <div className="card w-96 cardbackground shadow-xl">
                            <figure><img src={buyer?.profile}
                                className='h-80 w-full' alt="buyer" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Name: {buyer?.name}</h2>
                                <h2 className="card-title">Email: {buyer?.email}</h2>
                                <h2 className="card-title">Meeting location: {buyer?.meetingLocation}</h2>
                                <h2 className="card-title">Phone number: {buyer?.phoneNumber}</h2>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                myTotalBuyers.length === 0 && <> 
                <h2 className='my-14 mx-16 text-2xl text-blue-500'> You have no buyers right now !! </h2>
                </> 
            }
        </>
    );
};

export default MyBuyers;