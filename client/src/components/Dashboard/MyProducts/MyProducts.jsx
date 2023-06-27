
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import axios from "axios"
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { BsTrash } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
const MyProducts = () => {
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const [deletedData, setDeletedData] = useState({});
    const [closeModal, setCloseModale] = useState(true);
    const email = user.email;


    const { data: totalMyProducts = [email], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () =>
            fetch(`https://computer-sell.vercel.app/products/${email}`, {
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
    //
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
    //
    const handleAddproduct = (id) => {
        axios.put(`https://computer-sell.vercel.app/products/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Your product added to advertise successfully ")
                    return refetch();
                }
            })
            .then(error => console.log(error))
    }
    const hadleDelete = (deletdProduct) => {
        const id = deletdProduct._id
        axios.delete(`https://computer-sell.vercel.app/products/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Your one product item is deleted ")
                    setCloseModale(true);
                    return refetch();
                }
            }).catch(error => toast.error(error.message));
    }
    //
    const handleDeleteButton = (shareDeleted) => {
        setDeletedData(shareDeleted);
        setCloseModale(false)
    }
    return (
        <>
            <Helmet><title>My products </title></Helmet>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-8 mx-3'>
                {
                    totalMyProducts.map(product =>

                        <div className="card w-full cardbackground shadow-xl" key={product._id}>
                            <figure><img src={product.productImage} alt={product.productName} className='h-96 rounded-lg mt-2' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.productName}</h2>
                                <p> Description :{product.description}</p>
                                <p>Resell price ${product.ProductPrice}</p>
                                <p>Orginal price ${product.orginalPrice}</p>
                                <p>Seller phone number : {product.phoneNumber}</p>
                                <p>Seller email: {product.sellerEmail}</p>
                                <p>Product category : {product.productCategory}</p>
                                <p>Publish Date : {product.publishDate}</p>
                                <p>Publish time  : {product.publishTime}</p>
                                <p>Purchase year : {product.purchaseYear}</p>
                                <p>Seller location : {product.location}</p>
                                <p>Seller name : {product.sellerName}</p>
                                <div className="flex justify-start">
                                    <div>
                                        <p className='mt-4 mx-4  '> Your Profile Image : </p>
                                    </div>
                                    <div>
                                        <img src={product.sellerProfile} alt={product.sellerName}
                                            className="h-14 w-14  rounded-full animate-pulse border-2 border-primary" />
                                    </div>

                                </div>

                                <div className="card-actions justify-end">
                                    {
                                        product?.advertise ?
                                            <button className="btn btn-info btn-sm  text-white"> Advertised  </button>
                                            : <button className="btn btn-primary btn-sm"
                                                onClick={() => handleAddproduct(product._id)}>  Available  </button>
                                    }
                                    {
                                        product?.product === "sold" && refetch()  ?
                                            <button className="btn btn-success btn-sm text-white"> Sold   </button>
                                            : <button className="btn btn-info btn-sm text-white"> Unsold   </button>
                                    }
                                    <label htmlFor="deleteConfirm" onClick={() => handleDeleteButton(product)}>
                                        <BsTrash className='hover:cursor-pointer text-2xl
                                                 font-bold text-red-600 mx-3' ></BsTrash>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {closeModal === false &&
                <DeleteConformation
                    handleDelete={hadleDelete}
                    modalData={deletedData}
                    title={`Are you want to delete ${deletedData.productName}`}
                    text={`If you delete this product you can not recover it !!`}
                />
            }

            {
                totalMyProducts?.length === 0 &&
                <h2 className='text-2xl text-center my-36 font-bold'> Please add some product to see your my products page </h2>
            }
        </>
    );
};

export default MyProducts;