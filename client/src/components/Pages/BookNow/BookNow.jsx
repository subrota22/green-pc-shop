import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';

const BookNow = ({modalData , setCloseModale  }) => {
const {user} = useContext(AuthProvider) ;
const {handleSubmit , register , formState:{errors}  } = useForm() ;
const onSubmit = (bookingData) => {
 const bookingInformations = {
    name:user?.displayName,
    email:user?.email ,
    profile:user?.photoURL ,
    phoneNumber : bookingData?.phoneNumber.trim()  ,
    meetingLocation:bookingData?.meetingLocation.trim()  ,
    sellerEmail : modalData?.sellerEmail , 
    productImage : modalData?.productImage ,
    ProductPrice : modalData?.ProductPrice ,
    productName : modalData?.productName , 
    sellerProfile: modalData?.sellerProfile ,
    description : modalData?.description , 
    productsId : modalData._id , 
 }
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

 axios.post(`https://computer-sell.vercel.app/orders` , bookingInformations)
 .then(res => {
if(res.data.insertedId){
toast.success("Hurrah you are ordered successfully !! ") ;
setCloseModale(true) ;
}
 })
}

    return (
 <>
{/* Put this part before </body> tag */}
<input type="checkbox" id="bookingModal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="bookingModal" className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Category : {modalData?.productCategory}</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="card-body text-info">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" 
          defaultValue={user?.displayName} disabled
          className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="password"
              defaultValue={user?.email} disabled
          className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product name </span>
          </label>
          <input type="text" placeholder="product name "
            defaultValue={modalData?.productName} disabled
          className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product price </span>
          </label>
           <div  className="bg-gray-400 py-3 rounded-md
             px-3  hover:cursor-none">${modalData?.ProductPrice}</div>
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text" >Phone number  </span>
          </label>
          <input type="text" placeholder="Please enter your phone number "
        {...register("phoneNumber" , {required:true})}   className="input input-bordered" />
        {errors.phoneNumber && <p className='bg-error text-white p-3 my-2 rounded-md'>
            Please enter your phone number 
            </p>}
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text"> Meeting location   </span>
          </label>
          <input type="text" placeholder="Please enter your meeting location "
         {...register("meetingLocation" , {required:true})}  className="input input-bordered" />
        {errors.phoneNumber && <p className='bg-error text-white p-3 my-2 rounded-md'>
            Please enter your meeting location
            </p>}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary"> Bookg now <BsArrowRight className='mx-2 font-bold'></BsArrowRight></button>
        </div>
      </form>
  </div>
</div>
        </>
    );
};


export default BookNow;