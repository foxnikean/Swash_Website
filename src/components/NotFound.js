import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='bg-backgroundColor min-h-screen flex flex-col items-center justify-center w-full text-white text-3xl gap-3'>
      <span className=' text-9xl font-bold'>404</span>
      <span className="text-7xl">Kayboldun Sanırım</span>
      <span className="text-5xl">Hadi Seni Geri Gönderelim</span>
      <span className="text-5xl">Aşağıdaki Butona Tıkla</span>
      <Link to="/" className="bg-mor px-10 py-3 rounded-full mt-10">Anasayfaya Dön</Link>
    </div>
  );
};

export default NotFound;
