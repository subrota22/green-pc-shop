import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../../UserContext/UserContext';
import BookNow from '../../BookNow/BookNow';
import "../Categories/Categories.css" ;
const Advertise = () => {
  const [bookingData, setBookingData] = useState({});
  const [closeModal, setCloseModale] = useState(true);
  const [sellerInfo, setSellerInfo] = useState([]);
  const { currentUser } = useContext(AuthProvider);
//https://computer-sell.vercel.app/
  const { data: advertiseItems = [], isLoading  , refetch} = useQuery({
    queryKey: ['advertiseItems'],

    queryFn: () => fetch(`https://computer-sell.vercel.app/advertiseItems`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
      }
    })
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log(error))
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

  if (isLoading) {
    return (
      <>
        <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
      </>
    )
  }


  const handleBookingData = (books) => {
    setBookingData(books);
    setCloseModale(false);
  }


  return (
    <>

      {advertiseItems?.length !== 0 &&
        <>

          <div className='my-12'>
            <div className="flex  justify-between my-10">
              <div>
                <img src="https://i.ibb.co/fDCX1yw/unseen.png"
                  className='ml-12 imageAnimation w-52 ' alt="unseen product" />
              </div>

              <div className="hero ml-12 h-80  my-10">
                <div className="hero-content text-center">
                  <div className="max-w-md backgroundImage">
                    <h1 className="text-5xl font-bold"> Total {advertiseItems?.length}  </h1>
                    <p className="py-6">Get the unseen product so what are you waiting for book
                      this products as soon as possiable </p>
                    <button className="btn btn-primary">Get Started  <BsArrowRight
                      className='mx-2 font-bold'></BsArrowRight> </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4" id="latest-product">


              {
                advertiseItems?.map(advertise => advertise.advertise === true &&
                  <div className="card card-compact w-82 h-auto text-lg font-bold cardbackground 
                  hover:cursor-auto hover:translate-y-8  transition duration-1000 shadow-xl" key={advertise._id}>
      
                    <br /><br />
                    <figure><img src={advertise.productImage} alt="advertise-item"
                      className='h-96 -mt-5 rounded-md' /></figure>
                    <div className="card-body text-lg font-bold">
                      <h2 className="card-title">{advertise.productName}</h2>
                      <p>Description : {advertise.description}</p>
                      <p>Price ${advertise.ProductPrice}</p>
                      <p>Seller phone number : {advertise.phoneNumber}</p>
                      <p>Seller email: {advertise.sellerEmail}</p>
                      <p>Product category : {advertise.productCategory}</p>
                      <p>Publish date  : {advertise.publishDate}</p>
                      <p>Publish time  : {advertise.publishTime}</p>
                      <p>Purchase year : {advertise.purchaseYear}</p>
                      <p>Seller location : {advertise.location}</p>
                      <p>Seller name : {advertise.sellerName}</p>
                      <div className="flex justify-start">
                        <div>
                          <p className='mt-4 mx-4 '>Seller Profile Image : </p>
                        </div>
                        <div>
                          <img src={advertise.sellerProfile} alt={advertise.sellerName}
                            className="h-14 w-14  rounded-full  border-2 border-primary" />
                        </div>

                      </div>
                      { currentUser.role === "Buyer" &&
                      <div className="flex my-2">
                                    <div>  Seller status :  </div>
                                    {
                                        sellerInfo.map(seller => seller.email === advertise.sellerEmail
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
                                        sellerInfo.map(seller => seller.email === advertise.sellerEmail &&

                                            !seller?.isSellerVerified &&
                                            <div className="flex" key={seller._id} >
                                                <div className='mx-2'> Unverified  </div>

                                            </div>
                                        )
                                    }

                                </div>

                                  }
                            
                      <div className="card-actions justify-end">
                        {/* <NavLink to={`/book-now/${advertise._id}`}> */}
                        {/* The button to open modal */}
                        {
                          currentUser.role === "Buyer" &&
                          <label htmlFor="bookingModal" onClick={() => handleBookingData(advertise)}
                            className="btn btn-primary">
                            Book now  <BsArrowRight className='mx-2 font-bold'></BsArrowRight>
                          </label>
                        }
{   
                                    currentUser.role === "Buyer" &&  advertise?.product === "sold" && refetch() && 
                                        <button className="btn text-white btn-success animate-pulse">
                                      Already Sold   </button>  
                            
                                            
                                            }
                        {/* </NavLink> */}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {
            closeModal === false &&
            <BookNow
              modalData={bookingData}
              setCloseModale={setCloseModale}
            ></BookNow>}
        </>}

    </>
  );
};

export default Advertise;