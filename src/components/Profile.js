import React from "react";
import Navbar from "./Navbar";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { IoIosContact } from "react-icons/io";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileGeneral from "./profileComponents/ProfileGeneral";

const Profile = () => {
  const { user } = useAuthentication();
  const { id } = useParams();
  return (
    <div className='bg-backgroundColor min-w-screen min-h-screen'>
      <Navbar />
      <div className='container mx-auto px-56'>
        <div className=' bg-mor '>
          <div className='px-16 py-12'>
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
              <Link>Genel</Link>
              <Link>Biletlerim</Link>
              <Link>Şifre Değiştir</Link>
            </nav>
          </div>
          <div>
            <ProfileGeneral/>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Profile;
