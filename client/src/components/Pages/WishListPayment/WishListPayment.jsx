import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const WishListPayment = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const product = useLoaderData() ;
    return (
        <>
            <Helmet>
                <title> Product payments </title>
            </Helmet>
            <div className='text-center my-3 py-12  shadow-2xl'>
                <h2 className='text-2xl font-bold'>
                     Pay for 
                     <span className='text-white mx-2'>{product.productName}</span>
                      </h2>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm 
            product = {product}
                />
            </Elements>

        </>
    );
};

export default WishListPayment;