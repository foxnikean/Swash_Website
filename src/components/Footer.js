import React from "react";
import logo from "../assets/logo.png";
import { IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";

const Footer = () => {
  return (
    <div className='bg-black flex flex-col mt-48 container mx-auto pb-16'>
      <div className='w-full h-0.5 mb-7 bg-neonBlue'> </div>
      <div className='flex flex-col lg:flex-row text-white justify-between mx-4'>
        <img src={logo} className='w-32 mb-6 lg:mb-0' alt='' />
        <div className='flex gap-4 text-sm'>
          <div className='flex flex-col '>
            <a href=''> Hakkımızda </a> <a href=''> Çerez Politikası </a>
            <a href=''> Şartlar ve Koşullar </a>
            <a href=''> Kişisel Verilerin İşlenmesi Aydınlatma Metni </a>
          </div>
          <div className='flex flex-col '>
            <a href=''> Gizlilik </a> <a href=''> Açık Rıza Metni </a>
            <a href=''> İletişim </a>
            <a href=''> Kişisel Verilerin Korunması Politikası </a>
          </div>
        </div>
      </div>
      <div className='flex items-center  w-full mt-12 justify-between flex-col lg:flex-row gap-3 lg:gap-0'>
        <span className='text-gray-400'>
          
          Copyright Swash Bilet Basım ve Dağıtım A.Ş
        </span>
        <div className='flex gap-3 text-gray-400 items-center justify-center'>
          <span> Follow Us </span> <span> | </span>
          <div className='gap-1 flex '>
            <a href=''>
              <IoLogoInstagram />
            </a>
            <a href=''>
              <IoLogoTwitter />
            </a>
            <a href=''>
              <IoLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
