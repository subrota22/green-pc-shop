import React, { useContext, useState } from 'react';
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js"
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import {CopyToClipboard} from "react-copy-to-clipboard" ;
import {IoCopy} from "react-icons/io5" ;
import axios from 'axios';
import ButtonLoader from '../../Shares/ButtonLoader/ButtonLoader';
const CheckoutForm = ({product}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthProvider);
    const [payLoading, setPayLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const  {ProductPrice , _id , productsId  } = product ;
    const ordersId = _id ;
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
 //update document after paid successfully
  const updateInformations = {
   ordersId:ordersId ,  
   productsId : productsId ? productsId : ordersId ,
  }
 const upateDocument = (updateData) => {
    axios.put("https://computer-sell.vercel.app/updateDatabase" , updateData)
    .then(res  => res.data ) 
    .then(error => toast.error(error.message)) ;
 }
    const handleSubmit = async (event) => {
        setPayLoading(true)
        // Block native form submission.
        event.preventDefault();
        // Get a reference to a mounted CardElement. 
        const card = elements.getElement(CardElement);
        const productAmount = parseInt(ProductPrice) ;
        const price = { price: productAmount };
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
    //
//https://computer-sell.vercel.app/
//https://computer-sell.vercel.app/
//https://computer-sell.vercel.app/
        axios.post("https://computer-sell.vercel.app/create-payment-intent", price)
            .then((res) => {
                const clientSecret = res.data.clientSecret;
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.name,
                            email: user?.email,
                        },
                    },
                })
                    .then(function (result) {
                        if (result.paymentIntent.status === 'succeeded') {
                            toast.success(`Congrasulations you are paid successfully !! `);
                            setTransactionId(result.paymentIntent.id);
                            setPayLoading(false);
                            //update data base
                            upateDocument(updateInformations) ;
                        } else {
                            toast.error(result.error);
                            setPayLoading(false) ;
                        }
                    }).catch(error => {
                        console.log(error) ;
                        setPayLoading(false) ;
                    })

            });

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            return;
        }


        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(error.message);
            setPayLoading(false) ;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };
    return (
        <>
    {/* ------------- Checkout Form ---------------*/}
    <form onSubmit={handleSubmit} className='w-96 py-16 px-12 
    my-10 shadow-2xl bg-base-100
     mx-auto rounded-md'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || transactionId } className='btn btn-primary w-40 mt-20
              text-primary px-2 ' >
                    {
                        payLoading === true ?
                            <ButtonLoader></ButtonLoader> :
                            <>
                                {
                                    transactionId ? "Paid" : "Pay"
                                }
                            </>
                    }
                </button>
            </form>

            {  transactionId && 
             <div className='shadow-2xl text-center mx-auto py-6
            px-8 my-5 flex justify-center'>
                <h2> Your transaction id :  {transactionId} </h2>
         <CopyToClipboard text={transactionId}>
         <button onClick={() => toast.success("Transaction id copid successfully ")}
          className='text-success text-2xl font-bold mx-4'><IoCopy></IoCopy></button>
        </CopyToClipboard>
            </div> 
            }
   

        </>
    );
};

export default CheckoutForm;