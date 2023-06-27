import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthProvider } from '../../../UserContext/UserContext';
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  const { currentUser, loading } = useContext(AuthProvider);
  if (loading) {
    return <div style={{ marginLeft: "50%", marginTop: "20%", marginBottom:"20%" }}>
      <BeatLoader color='white'></BeatLoader>
    </div>
  }
  return (
    <>
      <Helmet><title>Dashboard</title></Helmet>

      <div className="drawer drawer-mobile">
        <input id="dashboard" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content w-full">
          <Outlet className="w-full"></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-white fw-bold fs-5">
            {
              currentUser.role === "Seller" &&
              <>
                <li><NavLink to="/dashboard/my-products"> My products </NavLink></li>
                <li><NavLink to="/dashboard/add-product"> Add a product </NavLink></li>
                <li><NavLink to="/dashboard/my-buyers"> My buyers </NavLink></li>

              </>
            }
            {
              currentUser.role === "Buyer" &&
              <>
                <li><NavLink to="/dashboard/my-orders"> My orders  </NavLink></li>
                <li><NavLink to="/dashboard/wishtList"> Wish list </NavLink></li>
              </>
            }
            {
              currentUser.role === "Admin" &&
              <>
                <li><NavLink to="/dashboard/repoted-items"> Repoted items  </NavLink></li>
                <li><NavLink to="/dashboard/all-buyers"> All buyers  </NavLink></li>
                <li><NavLink to="/dashboard/all-sellers"> All sellers   </NavLink></li>
              </>
            }

          </ul>
        </div>
      </div>c
    </>
  );
};

export default Dashboard;