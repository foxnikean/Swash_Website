import React, { useState } from "react";
import partyex from "../assets/partyex.webp";
import { IoIosArrowDown, IoIosArrowUp, IoLogoInstagram } from "react-icons/io";

const LittlePartyBox = () => {
  const [clicked, setclicked] = useState(false);
  return (
    <div className='text-white flex-col items-center justify-center'>
      <div
        className='group flex items-center h-16 transition-all flex-col lg:flex-row gap-4 cursor-pointer mb-1'
        onClick={() => setclicked(!clicked)}
      >
        {" "}
        {clicked ? null : (
          <React.Fragment>
            <img
              className='h-20 group-hover:h-0 transition-all'
              src={partyex}
              alt='party-thumbnail'
            />
            <span className='font-bold text-5xl group-hover:hidden hidden lg:block transition-all'>
              13{" "}
            </span>{" "}
            <div className='flex-col hidden font-bold group-hover:hidden lg:flex transition-all'>
              <span className='text-gray-200 text-opacity-70 '> Cum </span>{" "}
              <span> Oca </span>{" "}
            </div>{" "}
          </React.Fragment>
        )}{" "}
        {clicked ? (
          <h3 className='font-semibold lg:text-3xl text-lg  text-neonBlue group-hover:text-neonBlue transition-all'>
            Karma Game - Party{" "}
          </h3>
        ) : (
          <h3 className='font-semibold lg:text-3xl text-lg  group-hover:text-neonBlue transition-all'>
            Karma Game - Party{" "}
          </h3>
        )}{" "}
        {clicked ? (
          <IoIosArrowUp className=' text-neonBlue text-3xl' />
        ) : (
          <IoIosArrowDown className='hidden group-hover:block text-neonBlue text-3xl' />
        )}{" "}
        <button className='bg-neonBlue text-black font-light px-6 py-2'>
          Bilet Al{" "}
        </button>{" "}
      </div>{" "}
      {clicked ? (
        <p className=' w-1/2'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.Suscipit.{" "}
        </p>
      ) : null}{" "}
    </div>
  );
};

export default LittlePartyBox;
