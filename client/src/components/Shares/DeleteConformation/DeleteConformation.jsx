import React from 'react';

const DeleteConformation = ({handleDelete , title  , text ,  modalData , close }) => {
    return (
        <>

{/* Put this part before </body> tag */}
<input type="checkbox" id="deleteConfirm" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
 <div className="flex justify-between my-2">
 <h2 className='text-start text-4xl'> 💐💐 </h2>
  <h2 className='text-end text-4xl'>🌹🌹</h2>
 </div>
    <h3 className="font-bold text-lg text-error ">  {title}  </h3>
  
    <p className="py-4 text-error ">{text}</p>
    <div className="modal-action">
       <button className="btn btn-error text-white mx-4"
       onClick={() => handleDelete(modalData)}>Delete</button>
      <label htmlFor="deleteConfirm" className="btn btn-error text-white">Close</label>
    </div>
  </div>
</div>
        </>
    );
};

export default DeleteConformation;