import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query'
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { useNavigate } from 'react-router-dom';
const AllBuyers = () => {
    const [buyersData, setbuyersData] = useState(null);
    const [closeModal, setCloseModale] = useState(true);
    const navigate = useNavigate();
    //axios sending data in headers 
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () =>
            fetch(`https://computer-sell.vercel.app/buyers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return navigate("/login");
                    }
                    return res.json();
                })
                .then(data => data)
    })

    if (isLoading) {
        return (
            <>
                <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
            </>
        )
    }
    //handle delete 
    const handleDelete = (buyerInfo) => {
        axios.delete(`https://computer-sell.vercel.app/buyers/${buyerInfo._id}`)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate("/");
                }
                if (res.data.acknowledged) {
                    toast.success("Buyer account deleted successfully !! ");
                    refetch();
                    setCloseModale(false);
                }
            })
    }
    const getBuyersData = (buyers) => {
        setbuyersData(buyers);
        setCloseModale(true);
    }

    return (
        <>
            <Helmet> <title> All buyers  </title></Helmet>
            <h2 className='text-center my-2 text-2xl font-bold text-white'> 
            Total 
            <span className='mx-2'>  {
                buyers?.length 
            }</span>
            buyers found 
             </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className="overflow">
                    <table className="table text-gray-600">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Profile</th>
                                <th>Role</th>
                                <th> Delete </th>
                                <th>Edit </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                buyers.map((buyer, serial) =>
                                    <tr key={buyer._id}>
                                        <th>{serial + 1}</th>
                                        <td>{buyer?.name ? buyer?.name : "Buyer name not found"}</td>
                                        <td>{buyer?.email ? buyer?.email : "Buyer email not found"}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-16  border-2 border-primary rounded-full">
                                                    <img src={buyer.profile} alt="buyer" />
                                                </div>
                                            </div>
                                        </td>
                                        <td> {buyer.role} </td>
                                        <td>
                                            {/* The button to open modal */}
                                            <label htmlFor="deleteConfirm" onClick={() => getBuyersData(buyer)}>
                                                <BsTrash className='hover:cursor-pointer text-2xl font-bold text-red-600' ></BsTrash>
                                            </label>


                                        </td>
                                        <td>
                                            <FiEdit className='hover:cursor-pointer text-2xl font-bold text-success '></FiEdit>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                closeModal &&
                <DeleteConformation
                    handleDelete={handleDelete}
                    modalData={buyersData}
                    title={`Are you want to delete ${buyersData?.name} role ${buyersData?.role}  `}
                    text={`If you delete this information you can not recover it !!`}
                ></DeleteConformation>
            }
     {
            buyers?.length === 0 &&
            <h2 className='text-2xl text-center my-36 font-bold'> No available  buyer till now </h2>
          }
        </>
    );
};

export default AllBuyers;