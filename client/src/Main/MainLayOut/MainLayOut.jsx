import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Shares/Footer/Footer';
import Navbar from '../../components/Shares/Navbar/Navbar';

const MainLayOut = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayOut;