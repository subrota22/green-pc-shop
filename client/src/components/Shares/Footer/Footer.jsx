import React from 'react';
import { NavLink } from 'react-router-dom';
import {AiFillInstagram ,AiFillTwitterCircle } from "react-icons/ai" ;
import {BsGithub ,BsFacebook } from "react-icons/bs";
const Footer = () => {
const background = {
backgroundImage : `url('https://i.ibb.co/Xz7Vxn7/footer.webp')` ,
backgroundPosition:"center" ,
backgroundSize : "cover" ,
backgroundAttachment :"relative" , 
}
    return (
        <>
<div className="flex-col md:flex-col hero-overlay" style={background}>
<footer className="footer text-lg p-10 hero-overlay text-white font-bold">
  <div>
   <img src="https://i.ibb.co/5nPLpJK/logo.webp" alt="logo"className='h-14 
    animate-pulse rounded-md' />
    <p>PC SHOP ONLY <br/>Providing reliable resell PC  since 2012 </p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <NavLink to="/" className="link link-hover">PC </NavLink> 
    <NavLink to="/" className="link link-hover">Monitor</NavLink>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <NavLink to="/" className="link link-hover">About us</NavLink> 
    <NavLink to="/" className="link link-hover">Contact</NavLink> 
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <NavLink to="/" className="link link-hover">Privacy policy</NavLink> 
    <NavLink to="/" className="link link-hover">Cookie policy</NavLink>
  </div>

<div className="flex-col text-2xl">
<h2 className='text-end'>Connected with us by this social media </h2>
  <div className="grid grid-cols-4 mt-11 mx-auto gap-4 text-white shadow-2xl font-bold text-3xl ">
      <a  href="https://twitter.com/Subrota66881404" target="blank"> <AiFillTwitterCircle> </AiFillTwitterCircle> </a> 
      <a href="https://github.com/subrota22" target="blank"><BsGithub> </BsGithub></a> 
      <a href="https://www.facebook.com/subrota112/" target="blank"><BsFacebook></BsFacebook></a>
      <a href="https://www.instagram.com/fashionbyproduct21/" target="blank"><AiFillInstagram></AiFillInstagram></a>
    </div>
</div>
    
</footer>

<div className='text-2xl font-bold hero-overlay text-white py-2 text-center'>
  Copy right by Subrota Chandra Sarker (date: 25/11/2022)
   </div>
</div>


        </>
    );
};

export default Footer;