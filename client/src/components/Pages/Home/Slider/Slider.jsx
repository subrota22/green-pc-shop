import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const Slider = () => {
    return (
        <>
   <div className="carousel w-full hero-overlay bg-opacity-60 mb-8">

  <div id="slide1" className="carousel-item h-screen relative w-full">

    <img src="https://i.ibb.co/Y7PtfTm/banner1.jpg" alt='' 
    className="w-full " />

   <div className='absolute w-auto -mt-8 opacity-90   text-center font-bold 
   text-white  transform -translate-y-1/2 left-5 right-5 top-1/2'>
     <h2 className='text-2xl font-bold'> Why we are best  </h2>
    <p className='text-center px-25'>
    We are best for some regions, first of all, we are providing the <br />
     original and reusable products for everyone so that they can use them properly. <br />
     Thank to come here <br />
    </p>
    <button className="btn btn-primary text-white my-4">Get started 
    <BsArrowRight className='text-xl font-bold mx-2'></BsArrowRight></button>

   </div>

    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle btn-success text-white"> ❮❮  </a> 
      <a href="#slide2" className="btn btn-circle btn-success text-white"> ❯❯ </a>
    </div>
  </div> 

  <div id="slide2" className="carousel-item h-screen  relative w-full">

    <img src="https://i.ibb.co/2hRrzbZ/banner2.webp" alt='' 
    className="w-full " />

<div className='absolute w-auto -mt-8 opacity-90   text-center font-bold 
   text-white   transform -translate-y-1/2 left-5 right-5 top-1/2'>
     <h2 className='text-2xl font-bold'> Why we are best  </h2>
    <p className='text-center px-25'>
    We are best for some regions, first of all, we are providing the <br />
     original and reusable products for everyone so that they can use them properly. <br />
     Thank to come here <br />
    </p>
    <button className="btn btn-primary text-white my-4">Get started 
    <BsArrowRight className='text-xl font-bold mx-2'></BsArrowRight></button>

   </div>

    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle btn-success text-white"> ❮❮  </a> 
      <a href="#slide3" className="btn btn-circle btn-success text-white"> ❯❯ </a>
    </div>
  </div> 

  <div id="slide3" className="carousel-item h-screen  relative w-full">

    <img src="https://i.ibb.co/B41mkBD/banner4.jpg" alt='' 
    className="w-full " />

<div className='absolute w-auto -mt-8 opacity-90   text-center font-bold 
   text-white  transform -translate-y-1/2 left-5 right-5 top-1/2'>
     <h2 className='text-2xl font-bold'> Why we are best  </h2>
    <p className='text-center px-25'>
    We are best for some regions, first of all, we are providing the <br />
     original and reusable products for everyone so that they can use them properly. <br />
     Thank to come here <br />
    </p>
    <button className="btn btn-primary text-white my-4">Get started 
    <BsArrowRight className='text-xl font-bold mx-2'></BsArrowRight></button>

   </div>

    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle btn-success text-white"> ❮❮  </a> 
      <a href="#slide4" className="btn btn-circle btn-success text-white"> ❯❯ </a>
    </div>
  </div> 

    <div id="slide4" className="carousel-item h-screen  relative w-full">

    <img src="https://i.ibb.co/nbQrx0T/banner3.jpg" alt='' 
    className="w-full " />

<div className='absolute w-auto -mt-8 opacity-90   text-center font-bold 
   text-gray-800  transform -translate-y-1/2 left-5 right-5 top-1/2'>
     <h2 className='text-2xl font-bold'> Why we are best  </h2>
    <p className='text-center px-25'>
    We are best for some regions, first of all, we are providing the <br />
     original and reusable products for everyone so that they can use them properly. <br />
     Thank to come here <br />
    </p>
    <button className="btn btn-primary text-white my-4">Get started 
    <BsArrowRight className='text-xl font-bold mx-2'></BsArrowRight></button>

   </div>

    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle btn-success text-white"> ❮❮  </a> 
      <a href="#slide1" className="btn btn-circle btn-success text-white"> ❯❯ </a>
    </div>
  </div> 

</div> 
        </>
    );
};

export default Slider;