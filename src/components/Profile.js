import React, { useState } from "react";
import Navbar from "./Navbar";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { IoIosContact } from "react-icons/io";
import { Route, Routes, useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileGeneral from "./profileComponents/ProfileGeneral";
import { ProfileRoute } from "./ProfileRoute";
import MyTickets from "./MyTickets";

const Profile = () => {
  const { user } = useAuthentication();
  const { id } = useParams();
  const [route, setRoute] = useState(1);
  return user ? (
    <div className='bg-backgroundColor min-w-screen min-h-screen'>
      <Navbar />
      <div className='container mx-auto px-56'>
        <div className=' flex justify-between'>
          <div className='px-16 py-12 flex flex-col'>
            <div className=' flex flex-col items-start gap-5'>
              <img
                className='w-32 h-32 rounded-full'
                src={user.photoURL}
                alt=''
              />
              <span className='text-white font-semibold text-2xl'>
                {user.displayName}
              </span>
            </div>
            <nav className='flex flex-col items-start mt-6 font-semibold text-white gap-4'>
              <Link onClick={() => setRoute(1)}>Genel</Link>
              <Link onClick={()=>setRoute(0)}>Biletlerim</Link>
            </nav>
          </div>
          {route ? 
          <ProfileGeneral/> : <MyTickets/>
        }
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
