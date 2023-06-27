import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const ResellProcess = () => {
    return (
        <>
            <div className="hero min-h-screen my-4 text-md " style={{ backgroundImage: `url("https://i.ibb.co/B41mkBD/banner4.jpg")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                <div className="flex justify-evenly">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold"> Our resell process</h1>
                        <p className="mb-5">
                            We are first provide the best resell able products for PC ,
                            and that product is reuseable cause we are testing the product
                            quality and all the category that we should check first than
                            we are provide that product to you , if everything is ready than
                            we are advertise here some product to sell .  
                        </p>

                        <p>
                            <p className='text-2xl font-bold'> Are you confused ? </p>
                            We first provide the best reseresellableducts for PC,
                            and that product is reusable cause we are testing the product
                            quality and all the categories that we should check first then
                            we provide that product to you if everything is ready then
                            we are advertising here some products to sell.  
                        </p>
                        <button className="btn btn-primary my-2"> Get Started 
                        <BsArrowRight className='mx-2 text-xl'></BsArrowRight>
                         </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default ResellProcess;