import React, { useContext, useState } from 'react';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdFileUpload } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { AuthProvider } from '../../../UserContext/UserContext';
import ButtonLoader from '../../Shares/ButtonLoader/ButtonLoader';
import { TiTick } from 'react-icons/ti';
const AddProuduct = () => {
    const [productImage, setProductImage] = useState({});
    //navigate user 
    const navigate = useNavigate()
    //get category name
    const [categoryNames, setCategoryNames] = useState([]);
    //set category info 
    const [categoryInfo, setCategoryInfo] = useState({});
    //get form data 
    const { register, handleSubmit, formState: { errors } } = useForm();
    //user info
    const { user } = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    //on drop image callback 
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setProductImage(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    //get categories  id 
    const [categoryName, setCategoryName] = useState('');
    //image bb key 
    const image_bb_key = process.env.REACT_APP_imageBbKey;
    //get form data 
    const formData = new FormData();
    formData.append("image", productImage);
    //
    const {currentUser} = useContext(AuthProvider) ;
    //submit form data 
    const onSubmit = productData => {
        //create new user email and password based 
        setLoading(true);
        if (!productImage) {
            toast.error("Please enter your product image !! ");
            setLoading(false);
            return;
        }
        if (!user.email) return toast.error("Your email address is not found !!");
        fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
            method: "POST",
            body: formData,
        },)
      
            .then(res => res.json())
            .then(productImageUrl => {
                const productImage = productImageUrl.data.url;
                const date = format(new Date(), "PP");
                const time = new Date().toLocaleTimeString() ;
                const insertInformation = {
                    productName: productData.productName.trim(),
                    productCategory: productData.productCategory.trim(),
                    categoryId: categoryInfo._id.trim(),
                    purchaseYear: productData.purchaseYear.trim(),
                    ProductPrice: productData.ProductPrice.trim(),
                    orginalPrice: productData.orginalPrice.trim(),
                    phoneNumber: productData.phoneNumber.trim(),
                    location: productData.location.trim(),
                    productCondition: productData.productCondition.trim(),
                    productImage: productImage.trim(),
                    description: productData.description.trim(),
                    publishDate: date.trim(),
                    publishTime: time.trim(),
                    sellerName: user.displayName.trim(),
                    sellerEmail: user.email.trim(),
                    sellerProfile: user.photoURL.trim(),
                }
                if (!user.email) return toast.error("Your email is not found ");
                fetch(`https://computer-sell.vercel.app/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                    },
                    body: JSON.stringify(insertInformation)
                })
                    .then(res => {
                        if (res.status === 403 || res.status === 401) {
                            toast.error("Forbidden access");
                            navigate("/");
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.insertedId) {
                            toast.success(" Great job you add a product successfully  😀 😀 ");
                            setLoading(false);
                            navigate("/dashboard/my-products");
                        }
                        if (data.categoryExisted) {
                            toast.info(data.categoryExisted);
                            setLoading(false);
                        }
                    })
                    .catch(error => { console.log("Error: ", error); setLoading(false) })
            })
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
    //get category data
    React.useEffect(() => {
        axios.get(`https://computer-sell.vercel.app/categoriesName`)
            .then(res => setCategoryNames(res.data))
            .catch(error => console.log(error))
    }, []);

    React.useEffect(() => {
        if (!categoryName) return;
        axios.get(`https://computer-sell.vercel.app/categoriesInfo/${categoryName}`)
            .then(res => setCategoryInfo(res.data))
            .catch(error => console.log(error))
    }, [categoryName]);

    return (
        <>
            <Helmet><title>Add a product </title></Helmet>
            <div className="flex flex-row-reverse">
                <div>
                    <img src="https://i.ibb.co/924FcWM/rocket.png" alt="rocket"
                        className='h-52 mx-8 mt-52  imageAnimation transform  rotate-90' />
                </div>

                <div className='mx-auto shadow-2xl rounded-sm my-9' style={{ width: "55%" }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body text-blue-500">
                  <div className="flex justify-evenly">

                  <h2 className='text-3xl font-bold text-center  uppercase
                        animate-pulse'> Add A Product </h2>
                        
                        {currentUser?.isSellerVerified===true &&  
          
              <div>
             <h2 className='text-md text-inof  font-bold flex'> 
             <p>Verified Seller</p>
                <TiTick className='text-white
                text-2xl bg-blue-800  mx-2 rounded-full'></TiTick> </h2>
             </div>

                }     </div> 
                
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Product Category  </span>
                            </label>
                            <select  {...register("productCategory", {
                                required: true,
                            })} onChange={(event) => setCategoryName(event.target.value)}
                                className="select select-bordered text-blue-500 w-full max-w-xl">
                                <option disabled selected> Select your product category name  </option>
                                {
                                    categoryNames.map(categoryName =>
                                        <option className='text-blue-500'
                                            value={categoryName.productCategory}
                                            key={categoryName._id}>
                                            {categoryName.productCategory}
                                        </option>
                                    )
                                }
                            </select>

                            {errors.productCategory && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product category
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product name </span>
                            </label>
                            <input type="text" placeholder="Enter your product  name"
                                {...register("productName", {
                                    required: true,
                                })} className="input input-bordered" />
                            {errors.productName && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product name
                            </p>}
                        </div>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Purchase year   </span>
                            </label>
                            <input type="text" placeholder="Enter your purchase year"
                                {...register("purchaseYear", {
                                    required: true,
                                })} className="input input-bordered" />
                            {errors.productCategory && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product purchaseYear
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Resell  price </span>
                            </label>
                            <input type="text" placeholder="Enter your resell product price"  {...register("ProductPrice", {
                                required: true
                            }
                            )}
                                className="input input-bordered" />
                            {errors.ProductPrice && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product price
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Orginal price </span>
                            </label>
                            <input type="text" placeholder="Enter your  buying product price"  {...register("orginalPrice", {
                                required: true
                            }
                            )}
                                className="input input-bordered" />
                            {errors.ProductPrice && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product price
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone number </span>
                            </label>
                            <input type="text" placeholder="Enter your phone number"
                                {...register("phoneNumber", {
                                    required: true,
                                })} className="input input-bordered" />
                            {errors.phoneNumber && <p className='bg-error text-white my-2 p-3'>
                                Please enter your phone number
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" placeholder="Enter your location"
                                {...register("location", {
                                    required: true
                                })}
                                className="input input-bordered" />
                            {errors.location && <p className='bg-error text-white my-2 p-3'>
                                Please enter your location
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product condition</span>
                            </label>
                            <select {...register("productCondition", {
                                required: true,
                            })}
                                className="select select-bordered w-full max-w-xl">
                                <option disabled selected value="Good"> Select your product condition ? </option>
                                <option value="Good"> Good </option>
                                <option value="Excellent"> Excellent </option>
                                <option value="Fair">Fair </option>
                            </select>
                            {errors.productCondition && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product condition
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description </span>
                            </label><textarea type="text" placeholder="Write   description about the product "
                                {...register("description", { required: true, })}
                                className="textarea textarea-bordered py-4 " />
                            {errors.description && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product description
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Product picture  </span>
                            </label>
                            <div {...getRootProps()} className="hover:cursor-pointer">
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <div className='border-2 border-dotted py-6 px-2 rounded-md border-gray-600  text-center '>
                                            <ButtonLoader className="flex justify-center"> </ButtonLoader>
                                            <p> Your product pictures is uploading ....  </p>
                                        </div>

                                        :

                                        <div className='border-2 border-dashed py-6 px-2 rounded-md border-gray-600 '>
                                            <MdFileUpload className='text-center text-3xl font-bold text-gray-600
mx-auto '></MdFileUpload>
                                            {
                                                productImage.name ? <p> Your product picture name is  {productImage.name}</p> :
                                                    <p>Drop and drop your product picture here or click on this area to select an file </p>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-primary" type='submit'>
                                {loading ? <ButtonLoader > </ButtonLoader> : "Add product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProuduct;


