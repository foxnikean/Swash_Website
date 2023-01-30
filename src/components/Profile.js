import React from "react";
import Navbar from "./Navbar";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { IoIosContact } from "react-icons/io";
import { useParams } from "react-router";

const Profile = () => {
  const { id } = useParams();
  return (
    <div className='bg-black min-w-screen min-h-screen'>
      <div className='container mx-auto'>
        <Navbar />
        <div className='text-white'>
          <div className='flex items-center gap-5'>
            <IoIosContact className='text-9xl text-mor' />
            <span className='text-6xl text-mor'> {id} </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Profile;
