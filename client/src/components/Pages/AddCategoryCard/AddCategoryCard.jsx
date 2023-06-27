import React from 'react';
import { NavLink } from 'react-router-dom';
const AddCategoryItems = () => {
  return (
    <>
      {

        <div className="card w-96 mx-auto my-9 h-96 py-10  shadow-2xl  border-2 border-info">

          <div className="card-body flex justify-center items-center ">
            <h2 className='text-2xl font-semibold h-20 -mt-12 text-center rounded  text-white'>
              Add new catagory </h2>

            <NavLink to="/add-categories" className='border-4 p-4 -mt-6 rounded-full
 border-info border-dotted hover:cursor-pointer '>
             <h2> Add </h2>
            </NavLink>

          </div>
        </div>}
    </>
  );
};

export default AddCategoryItems;