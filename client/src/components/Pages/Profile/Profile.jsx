import React from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthProvider } from '../../../UserContext/UserContext';
import WaveStart from '../../Shares/Wave/Wave';

const Profile = () => {
    const {user} = useContext(AuthProvider) ;
    return (
        <>
            <Helmet><title>Profile</title></Helmet>

            <div>
                <WaveStart></WaveStart>
                <div className="h-25">
                   <img src={user?.photoURL} alt="user" className='userImage' />
                </div>
                <div className="card-body">
                    <div className="card-text mx-auto text-white fs-2 fw-bolder">
                        <h2> Name : {user?.fullName ? user?.fullName : "name not found"}</h2>
                        <h2> Email : {user?.email ? user?.email : "name not found"}</h2>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;