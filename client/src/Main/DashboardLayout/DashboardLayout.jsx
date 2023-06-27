import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard/Dashboard';
import Footer from '../../components/Shares/Footer/Footer';
import Navbar from '../../components/Shares/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Dashboard></Dashboard>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;