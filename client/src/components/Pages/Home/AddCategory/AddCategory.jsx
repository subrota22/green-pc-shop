import React, { useContext, useState } from 'react';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdFileUpload } from "react-icons/md";
import ButtonLoader from '../../../Shares/ButtonLoader/ButtonLoader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { AuthProvider } from '../../../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AddCategory = () => {
    const [productImage, setProductImage] = useState({});
    //navigate user 
    const navigate = useNavigate()
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
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
        ;
    //image bb key 
    const image_bb_key = process.env.REACT_APP_imageBbKey;
    //get form data 
    const formData = new FormData();
    formData.append("image", productImage);
    //submit form data 
    const onSubmit = categoryData => {

        //create new user email and password based 
        setLoading(true);
        if (!productImage) {
            toast.error("Please enter your product image !! ");
            setLoading(false);
            return;
        }
        fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
            method: "POST",
            body: formData,
        },)
            .then(res => res.json())
            .then(data => {
                const productImage = data.data.url;
                const date = format(new Date(), "PP");
                 const time = new Date().toLocaleTimeString() ;
                const categoryInformation = {
                    productCategory: categoryData.productCategory.trim(),
                    ProductPrice: categoryData.ProductPrice.trim(),
                    phoneNumber: categoryData.phoneNumber.trim(),
                    location: categoryData.location.trim(),
                    productCondition: categoryData.productCondition.trim(),
                    productImage: productImage.trim(),
                    description: categoryData.description.trim(),
                    publishDate: date.trim(),
                    publishTime:time.trim() , 
                    sellerName: user.displayName.trim(),
                    sellerEmail: user.email.trim(),
                    sellerProfile: user.photoURL.trim(),
                }
                fetch(`https://computer-sell.vercel.app/categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization:`Bearer ${localStorage.getItem("pc-shop-only")}`
                    },
                    body: JSON.stringify(categoryInformation)
                })
                    .then(res =>{
                    if(res.status === 403 ) {
                    return toast.error("Forbidden access") ;
                    }
                    return  res.json() ;
                    })
                    .then(data => {
                        if (data.insertedId) {
                            toast.success(" Great job you are add an category successfully  😀 😀 ");
                            setLoading(false);
                            navigate("/");
                        }
                        if (data.categoryExisted) {
                            toast.info(data.categoryExisted);
                            setLoading(false);
                        }
                    })
                    .catch(error => { console.log("Error: ", error); setLoading(false) })
            })
    }

    return (
        <>
        <Helmet><title>Add category</title></Helmet>
            <div className="flex flex-row-reverse">
                <div>
                    <img src="https://i.ibb.co/924FcWM/rocket.png" alt="rocket"
                        className='h-80 mx-4 mt-52 imageAnimation transform  rotate-90' />
                </div>

                <div className='mx-auto shadow-2xl my-9' style={{ width: "40%" }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h2 className='text-3xl font-bold text-center text-white'> Add category </h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product category </span>
                            </label>
                            <input type="text" placeholder="Enter your product category name"
                                {...register("productCategory", {
                                    required: true,
                                })} className="input input-bordered" />
                            {errors.productCategory && <p className='bg-error text-white my-2 p-3'>
                                Please enter your product category
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Resell price </span>
                            </label>
                            <input type="text" placeholder="Enter your resell price"  {...register("ProductPrice", {
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
                                <span className="label-text">Orginal price </span>
                            </label>
                            <input type="text" placeholder="Enter your orginal price"  {...register("orginalPrice", {
                                required: true
                            }
                            )}
                                className="input input-bordered" />
                            {errors.orginalPrice && <p className='bg-error text-white my-2 p-3'>
                                Please enter your orginal price
                            </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone number </span>
                            </label>
                            <input type="number" placeholder="Enter your phone number"
                                {...register("phoneNumber", {
                                    required: true,
                                })} className="input input-bordered" />
                            {errors.phoneNumber && <p className='bg-error text-white my-2 p-3'>
                                Please enter your phone number
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Purchase year  </span>
                            </label>
                            <input type="text" placeholder="Enter your purchase price"  {...register("PurchaseYear", {
                                required: true
                            }
                            )}
                                className="input input-bordered" />
                            {errors.orginalPrice && <p className='bg-error text-white my-2 p-3'>
                                Please enter your orginal price
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
                                <span className="label-text"> Category picture  </span>
                            </label>
                            <div {...getRootProps()} className="hover:cursor-pointer">
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <div className='border-2 border-dotted py-6 px-2 rounded-md border-gray-600  text-center '>
                                            <ButtonLoader className="flex justify-center"> </ButtonLoader>
                                            <p> Your category pictures is uploading ....  </p>
                                        </div>

                                        :

                                        <div className='border-2 border-dashed py-6 px-2 rounded-md border-gray-600 '>
                                            <MdFileUpload className='text-center text-3xl font-bold text-gray-600
mx-auto '></MdFileUpload>
                                            {
                                                productImage.name ? <p> Your category picture name is  {productImage.name}</p> :
                                                    <p>Drop and drop your category picture here or click on this area to select an file </p>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-primary" type='submit'>
                                {loading ? <ButtonLoader > </ButtonLoader> : "Add category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCategory;