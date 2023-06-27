import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';

const RepotedItems = () => {
    const [deleteData, setDeletedData] = useState({});
    const [closeModal, setCloseModel] = useState(true);
    const navigate = useNavigate();
    //send data in headers by axios
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        }
        ,
        error => {
            return Promise.reject(error);
        }
    );

    const { data: repotedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['repotedItems'],
        queryFn: () =>
            fetch(`https://computer-sell.vercel.app/repotedItems`, {
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
    console.log(repotedItems);
    if (isLoading) {
        return (
            <>
                <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
            </>
        )
    }
    const handleReportDelete = (repotedItem) => {
        axios.delete(`https://computer-sell.vercel.app/deleteRepotedItems/${repotedItem._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Congrasulations you are deleted repoted item successfully !! ")
                    setCloseModel(true)
                    return refetch();
                }

            })
            .catch(error => toast.error(error.message));
    }

    const handleReportData = (repotedItem) => {
        setDeletedData(repotedItem);
        setCloseModel(false);
    }
    return (
        <>
            <Helmet><title>Repoted items </title></Helmet>
            <h2 className='text-center text-2xl font-bold text-white my-2'> 
            Total 
           <span className='mx-2'>  {
                repotedItems?.length 
            }</span>
             repoted items  found 
             </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    repotedItems.map(repotedItem =>
                        <div className="card w-96 cardbackground shadow-xl">
                            <figure><img src={repotedItem?.productImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Product name : {repotedItem?.productName}</h2>
                                <p> Seller name :  {repotedItem?.sellerName}</p>
                                <p> Product condition : {repotedItem?.productCondition}</p>
                                <div className="flex flex-col">
                                    <div>
                                        <p>  Seller profile :  </p>
                                    </div>
                                    <div>
                                        <img src={repotedItem?.sellerProfile} alt={repotedItem?.sellerName}
                                            className="h-14 w-14 rounded-full border-2 border-info" />
                                    </div>
                                </div>
                                <div className="card-actions justify-end">
                                    <label htmlFor="deleteConfirm" onClick={() => handleReportData(repotedItem)}>
                                        <BsTrash className='hover:cursor-pointer text-2xl font-bold text-red-600' ></BsTrash>
                                    </label>

                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
            {
                repotedItems?.length === 0 &&
                <p className='text-2xl font-bold text-white text-center 
                my-10 '> No repoted item found till now </p>
            }
            {

                closeModal === false &&

                <DeleteConformation
                    handleDelete={handleReportDelete}
                    title={`Are you want to delete ${deleteData?.productName}`}
                    text={`If you delete this data you can to recove it `}
                    modalData={deleteData}
                />}

{
                repotedItems?.length === 0 &&
                
                <h2 className='text-2xl font-bold'>
                        <Typewriter
                        words={['No repoted item found right now !!' ]}
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

export default RepotedItems;