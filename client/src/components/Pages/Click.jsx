import React from 'react';

function EventFunction() {
    const clickHandler = () => {
    alert("Thanks to click this button !!") ;
    }
    return (
    <React.Fragment>
     <button onClick={() => clickHandler ()}> Click here </button>
    </React.Fragment>
    )
    }
export default EventFunction ;
    