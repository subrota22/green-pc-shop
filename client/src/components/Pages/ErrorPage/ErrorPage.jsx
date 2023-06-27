import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader" ;
const ErrorPage = () => {
    return (
        <>
            <Helmet><title>Page not found </title></Helmet>
        <div className="flex flex-col  my-8 md:flex-row  justify-between mx-4">
        <h2 className='text-3xl font-bold text-center text-white my-6 
             animate-bounce  duration-1000 '> Page not found      
                <NavLink to="/"> back to <span className='text-primary
               '> Home ! </span> </NavLink> </h2>
                <ClockLoader color="#36d7b7" className='mx-auto my-5' />
        </div>
            <img src="https://i.ibb.co/br749F7/404.webp" alt="page not found"
            className='h-screen w-screen' />
        </>
    );
};

export default ErrorPage;