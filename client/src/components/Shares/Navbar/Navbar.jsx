import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthProvider } from '../../../UserContext/UserContext';
import { toast } from 'react-toastify';
import {HiBars3} from "react-icons/hi2" ;
const Navbar = () => {
    const { logOutUser, setUser , user } = useContext(AuthProvider);

        //handle log out user
        const handleLogOutUser = () => {
            logOutUser()
                .then(() => {
                    toast.info("Your profile has been log out successfully !! ");
                    setUser({});
                })
        }

    const menueItems = <>
        <li><NavLink to="/"> Home </NavLink></li>
       { 
    !user.uid &&  <>
       <li><NavLink to="/register"> Register </NavLink></li>
        <li><NavLink to="/login">Login </NavLink></li>
   </>
        }
          <li><NavLink to="/blogs"> Blogs </NavLink></li>
         {
            user.uid &&   <li><NavLink to="/dashboard"> Dashboard </NavLink></li>
         }
    
    </>


    return (
        <>
            <div className="navbar cardbackground mb-4 py-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow cardbackground rounded-box w-52">
                            {menueItems}
                        </ul>
                      
                    </div>
                    <NavLink to="/" className="normal-case text-xl flex ">
                      <img src="https://i.ibb.co/5nPLpJK/logo.webp" alt="logo" 
                      className='h-10'/>
                    <span className='text-success uppercase animate-pulse hidden md:block mx-6'>  All Green computers </span>
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal  p-0">

                        {menueItems}
         
                    </ul>
                   {
                    user.uid &&
                    <button className='btn btn-error ml-4 mr-4 mx-auto btn-md rounded-lg text-white my-2'onClick={handleLogOutUser}>Logout</button>
                   }
                </div>
                <div className="navbar-end">
       
                     {  user.uid && <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-14">
                                    <img src={user.photoURL ? user.photoURL : "https://i.ibb.co/Pwh4tt1/noimgs.png"} alt='user profile' className='rounded-full'/>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow cardbackground rounded-box w-52">
                                <li>
                                    <NavLink to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </NavLink>
                                </li>
                                <li><NavLink className="my-2">Settings</NavLink></li>
                                <li><button className='btn btn-error text-white my-2'
                                    onClick={handleLogOutUser}>Logout</button></li>
                            </ul>
                        </div>}
                        
                </div>

                <label htmlFor="dashboard" 
            className="drawer-button lg:hidden text-2xl font-bold mx-2 
            hover:cursor-pointer">
                <HiBars3></HiBars3>
            </label>
  
            </div>

        
        </>
    );
};

export default Navbar;