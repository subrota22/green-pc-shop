
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import BookNow from '../BookNow/BookNow';
import { TiTick } from "react-icons/ti";
const AllAvailableProducts = () => {
    const products = useLoaderData();
    const categoryId = products[0]?.categoryId;
    const [bookingData, setBookingData] = useState({});
    const [closeModal, setCloseModale] = useState(true);
    const { user, currentUser } = useContext(AuthProvider);
    const [sellerInfo, setSellerInfo] = useState([]);
    const navigate = useNavigate();

    const handleBookingData = (books) => {
        setBookingData(books);
        setCloseModale(false);
    }

    const { data: productItems = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () =>
            fetch(`https://computer-sell.vercel.app/availAbleProducts/${categoryId}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return navigate("/");
                    }
                    return res.json()
                }
                )
                .then(data => data)
    })

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

    React.useEffect(() => {
        //get all users 
        axios.get("https://computer-sell.vercel.app/users")
            .then(res => setSellerInfo(res.data))
            .then(error => toast.error(error.message));
    }, []);

    const handleWishList = (productItem) => {
        if (!user?.email) return;

        const wishtListInfo = {
            buyerEmail: user?.email,
            productId: productItem._id,
        }
        axios.put(`https://computer-sell.vercel.app/wishList/`, wishtListInfo)
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    return navigate("/")
                }
                if (res.data.modifiedCount > 0) {
                    toast.success(productItem?.productName + "  sucessfully added to wish list")
                    return refetch();
                }
            }).catch(error => toast.error(error.message))
    }

    if (currentUser.role !== "Buyer") {
        return;
    }

    const handleReport = (product) => {
        axios.put(`https://computer-sell.vercel.app/repot/${product._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    toast.success("You are repoted successfully for " + product.productName)
                    return refetch();
                }
            })
            .then(error => toast.error(error.message));
    }
    if (isLoading) {
        return (
            <>
                <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
            </>
        )
    }
    return (
        <>
            <Helmet>
                <title> Available products </title>
            </Helmet>
            <h2 className='text-center text-white font-bold text-2xl'>Total
                <span className='mx-3 text-success'> {productItems?.length}</span> available  products for  :
                <span className='mx-3 text-success'>  {productItems[0]?.productCategory ? productItems[0]?.productCategory : "this category"}  </span> </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-10 mx-auto lg:grid-cols-3">
                {
                    productItems.map(product =>
                        <div className="card w-96 bg-dark text-white hover:translate-y-8  transition duration-1000 shadow-xl" key={product._id}>
                            <figure className="px-10 pt-10">
                                <img src={product?.productImage} alt="product"
                                    className="rounded-xl h-96 w-full " />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product?.productName}</h2>
                                <p> {product?.description?.length > 120 ?
                                    product?.description.slice(0, 138) + "..." :
                                    product?.description} </p>
                                <p> Resell price :  <strong>${product?.ProductPrice}</strong></p>
                                <p> OrginalPrice price :  <strong>${product?.orginalPrice}</strong></p>
                                <p>Seller phone number : {product?.phoneNumber}</p>
                                <p>Seller email: {product?.sellerEmail}</p>
                                <p>Product category : {product?.productCategory}</p>
                                <p>Publish Date , Time  : {product?.publishTime}</p>
                                <p>Purchase year : {product?.purchaseYear}</p>
                                <p>Seller location : {product?.location}</p>
                                <p>Seller name : {product?.sellerName}</p>

                                <div className="flex justify-start">
                                    <div>
                                        <p className='mt-4 mx-4  '>Seller Profile Image : </p>
                                    </div>
                                    <div>
                                        <img src={product.sellerProfile} alt={product.sellerName}
                                            className="h-14 w-14  rounded-full border-2 border-primary" />
                                    </div>

                                </div>

                                <div className="flex my-2">
                                    <div>  Seller status :  </div>
                                    {
                                        sellerInfo.map(seller => seller.email === product.sellerEmail
                                            && seller?.isSellerVerified &&
                                            <div className="flex" key={seller._id} >
                                                <div className='mx-2'>   verified  </div>
                                                <div>
                                                    <TiTick className='text-white
                                                   text-2xl bg-blue-800   rounded-full'></TiTick>
                                                </div>

                                            </div>
                                        )
                                    }
                                    {
                                        sellerInfo.map(seller => seller.email === product.sellerEmail &&

                                            !seller?.isSellerVerified &&
                                            <div className="flex" key={seller._id} >
                                                <div className='mx-2'> Unverified  </div>

                                            </div>
                                        )
                                    }

                                </div>
                                {
                                    currentUser.role === "Buyer" &&
                                    <div className="card-actions">
                                        {product?.product !== "sold" ?
                                            <label htmlFor="bookingModal" onClick={() => handleBookingData(product)}
                                                className="btn btn-primary btn-sm">
                                                Book now
                                            </label> : product?.product === "sold" && refetch() &&
                                            <button className="btn btn-success text-white btn-sm ">
                                                Booked   </button>
                                        }
                                        {
                                            product?.product !== "sold" &&
                                            <>

                                                {

                                                    product.wishList === true ? <button className="btn  btn-sm 
                                              btn-success  inline-block text-white">
                                                        Wish list added </button> :

                                                        <button className="btn btn-primary btn-sm  inline-block"
                                                            onClick={() => handleWishList(product)}>
                                                            Add to wish list</button>
                                                }

                                            </>
                                        }
                                        {

                                            product?.productIsRepote === "repoted" ?
                                                <button className="btn btn-success text-white btn-sm ">
                                                    Repoted   </button> :
                                                <button className="btn btn-primary text-white btn-sm "
                                                    onClick={() => handleReport(product)}>
                                                    Repot   </button>

                                        }
                                        {
                                            product?.product === "sold" && refetch() &&
                                            <button className="btn text-white btn-success btn-sm animate-pulse">
                                                Already Sold   </button>


                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {
                closeModal === false &&
                <BookNow
                    modalData={bookingData}
                    setCloseModale={setCloseModale}
                ></BookNow>
            }

            {
                products?.length === 0 &&
                <div className='my-20 bg-gray-600 py-28 text-white text-3xl p-6'>
                    <h2> New resell product will be available within 24 hours untill that time go to the home page  </h2>
                </div>
            }
        </>
    );

};

export default AllAvailableProducts;