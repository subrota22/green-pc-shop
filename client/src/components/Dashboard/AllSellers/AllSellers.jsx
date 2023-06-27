import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query'
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { useNavigate } from 'react-router-dom';
import {TiTick} from "react-icons/ti" ;
const AllSellers = () => {
  const [sellersData, setSellersData] = useState(null);
  const [closeModal, setCloseModale] = useState(true);
  const navigate = useNavigate();
  //send headers information by axios 
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  //get sellers information
  const { data: sellers = [], isLoading, refetch } = useQuery({
    queryKey: ['sellers'],
    queryFn: () =>
      fetch(`https://computer-sell.vercel.app/sellers`, {
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
  //handle delete 
  const handleDelete = (sellerInfo) => {
    axios.delete(`https://computer-sell.vercel.app/sellers/${sellerInfo._id}`)
      .then(res => {
        if (res.data.acknowledged) {
          toast.success("Seller account deleted successfull !! ");
          setCloseModale(false);
          refetch();
        }
      })
  }
  const handleUpdate = (seller) => {
    axios.put(`https://computer-sell.vercel.app/sellers/` , seller)
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          return navigate("/");
        }
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`Your are successfully  verified ${seller.name} `);
        }
      })
      .catch(error => console.log(error))
  }

  //show modal and set sellers data
  const getSellerData = (sellers) => {
    setSellersData(sellers);
    setCloseModale(true);
  }


  return (
    <>
      <Helmet> <title> All sellers </title></Helmet>
      <h2 className='text-center text-2xl my-2 font-bold text-white'> 
            Total 
            <span className='mx-2'> {
                sellers?.length 
            }</span>
            sellers  found 
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
                <th>Current status </th>
                <th>Role</th>
                <th> Delete </th>
                <th>Edit </th>
              </tr>
            </thead>
            <tbody>
              {
                sellers.map((seller, serial) =>
                  <tr key={seller._id}>
                    <th>{serial + 1}</th>
                    <td>{seller?.name ? seller?.name  :"Seller name not found" } </td>
                    <td>{seller?.email ? seller?.email  :"Seller email not found"}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-16  border-2 border-primary rounded-full">
                          <img src={seller.profile} alt="seller" />
                        </div>
                      </div>
                    </td>
                    <td>
                      {seller.isSellerVerified === true ?
                        <TiTick className='text-white
                        text-2xl bg-blue-800   rounded-full'></TiTick>:
                        <button><ClipLoader color="#DE1068" onClick={() => handleUpdate(seller)} /></button>}
                    </td>
                    <td> {seller.role} </td>
                    <td>
                      {/* The button to open modal */}
                      <label htmlFor="deleteConfirm" onClick={() => getSellerData(seller)}>
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
          modalData={sellersData}
          title={`Are you want to delete  ${sellersData?.name}  ?  role ${sellersData?.role}`}
          text={`If you delete this information you can not recover it !!`}
        ></DeleteConformation>
      }
         
   {
            sellers?.length === 0 &&
            <h2 className='text-2xl text-center my-36 font-bold'> No available  seller till now </h2>
          }
    </>
  );
};

export default AllSellers;