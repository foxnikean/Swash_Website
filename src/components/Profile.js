import React, { useState } from "react";
import Navbar from "./Navbar";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { IoIosContact } from "react-icons/io";
import { Route, Routes, useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileGeneral from "./profileComponents/ProfileGeneral";
import { ProfileRoute } from "./ProfileRoute";
import MyTickets from "./MyTickets";
import partyex from "../assets/partyex.png";
import ProfileForm from "./profileComponents/ProfileForm";
import ProfileTickets from "./profileComponents/ProfileTickets";

const Profile = () => {
  const { user } = useAuthentication();
  const { id } = useParams();
  const [route, setRoute] = useState("Genel");
  return user ? (
    <div className='bg-backgroundColor min-w-screen min-h-screen'>
      <Navbar />
      <div className='container mx-auto px-56 flex flex-col gap-36'>
        <div className='relative'>
          <img className='h-52 w-full' src={partyex} alt='' />
          <div className='absolute top-36 ml-6 flex items-center flex-col gap-3'>
            <img
              className='w-32 h-32 rounded-full '
              src={user.photoURL}
              alt=''
            />
            <span className='text-white text-xl'>{user.displayName}</span>
          </div>
        </div>
        <nav className='text-white list-none flex items-center justify-center border-b-2 border-mor pb-4'>
          <ul className='flex gap-10'>
            <li className="cursor-pointer" onClick={() => setRoute("Genel")}>Genel</li>
            <li className="cursor-pointer" onClick={() => setRoute("Biletlerim")}>Biletlerim</li>
            <li className="cursor-pointer" onClick={() => setRoute("Bildirimler")}>Bildirimler</li>
          </ul>
        </nav>
        {route === "Genel" ? <ProfileForm/> : <ProfileTickets/>}
       
      </div>
    </div>
  ) : null;
};

export default Profile;
