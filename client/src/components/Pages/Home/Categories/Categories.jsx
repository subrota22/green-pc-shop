import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';

import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { AuthProvider } from '../../../../UserContext/UserContext';
import AddCategoryCard from '../../AddCategoryCard/AddCategoryCard';
import "./Categories.css";
const Categories = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthProvider);
  const backGroundStyle = {
    backgroundImage: `url('https://i.ibb.co/dDjD0ss/background-image.jpg')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }
  //hhttps://computer-sell.vercel.app/
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories '],
    queryFn: () => fetch(`https://computer-sell.vercel.app/categories`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
      }
    })
      .then(res => {
        if (res.status === 403 || res.status === 401) {
          toast.error("Access denied please login first !!");
          navigate("/login");
        }
        return res.json()
      })
      .then(data => data)
      .catch(error => {
        console.log(error);
      })
  })


  return (
    <>
      {
        isLoading ? <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader> :
          <>
            <div>
              <h2 className='text-3xl font-bold text-center mt-3'> Get the best reuseable Computers   !! </h2>
              <p className='text-white font-bold p-10 text-xl'>
                Get the latest product from here we provide you with a lot of resold products that product
                 are good for your starting or full work time and one thing we provide only PC-related products like Monitor, PC, keyboards,
                  mice, and some parts for the pc you can get that pc any time from this website 
                  so what are you waiting for let's book the latest product we are waiting for you.
                Thanks to come here !!
              </p>
              <div style={backGroundStyle} className="py-10 px-3 mx-3 rounded-md">

                <img src="https://i.ibb.co/9YBCNWt/flying4.png" alt="flying"
                  className='h-72 w-80 rotate-65 imageAnimation mx-auto' />
                <a href="#latest-product">

                  <button className="btn btn-primary text-center ml-7 animate-pulse">
                    Get the latest product <BsArrowRight className='mx-2 text-xl'></BsArrowRight>
                  </button>
                </a>
              </div>
            </div>

            {/* all products category  */}
            <h2 className='text-center font-bold text-3xl text-white my-6'> There is a total of {categories?.length} categories available for Computer . 
            Create your account to buy something from this website , what you waiting for create an 
            account as soon as possiable. </h2>
            <div className="grid gap-8 mx-2 my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

              {
                categories?.map(category =>
                  <div className="card w-96 cardbackground shadow-xl" key={category._id}>
                    <figure><img src={category?.productImage} alt="product"
                      className='w-80 h-auto mt-9 rounded-md bg-slate-600' /></figure>
                    <div className="card-body">
                      <h2 className="card-title"> Category : {category?.productCategory}</h2>
                      <p> {category?.description} </p>
                      <p>Price ${category?.ProductPrice}</p>
                      <p>Publish Time {category?.publishTime}</p>
                      <p>Publish Date  {category?.publishDate}</p>
                      {
                        currentUser.role === "Buyer" &&
                        <div className="card-actions justify-end">
                          <NavLink to={`/available-products/${category._id}`}>
                            <button className="btn btn-primary"> Show all <BsArrowRight className='mx-2 font-bold'></BsArrowRight></button>
                          </NavLink>
                        </div>}

                    </div>
                  </div>

                )
              }
              {
                currentUser.role === "Seller" &&
                <AddCategoryCard></AddCategoryCard>
              }

            </div>
          </>
      }
    </>
  );
};

export default Categories;