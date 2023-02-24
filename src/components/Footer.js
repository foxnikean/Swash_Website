import React from "react";
import logo from "../assets/logo.png";
import { IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";
import { Link } from "react-router-dom";
import iyzico from "../assets/logo_band_white@3x.png"
const Footer = () => {
  return (
    <div className='bg-black flex flex-col mt-48 pb-16 pt-8 px-8 border-t-2 '>
      <div className='flex flex-col lg:flex-row text-white justify-between mx-4'>
        <img src={logo} className='w-32 mb-6 lg:mb-0' alt='' />
        <div className='flex gap-4 text-sm'>
          <div className='flex flex-col '>
            <Link>Hakkımızda </Link>
            <Link to={`/Agreement/cookie`}> Çerez Politikası </Link>
            <Link to={`/Agreement/kullanım`}>Kullanım Koşulları </Link>
            <a
              href='https://firebasestorage.googleapis.com/v0/b/swashv3.appspot.com/o/KVKK.pdf?alt=media&token=e61efbd9-5a8d-40b9-ac32-f982b6f3666e'
              target='_blank'
            >
              Kişisel Verilerin İşlenmesi Aydınlatma Metni
            </a>
          </div>
          <div className='flex flex-col '>
            <Link to={`/Agreement/user`}> Kullanıcı Sözleşmesi</Link>
             <Link> Açık Rıza Metni</Link>
            <Link to='/Contact'>İletişim </Link>
            <Link to={`/Agreement/privacy`}> Gizlilik</Link>
          </div>
        </div>
      </div>
      <div className='flex items-center  w-full mt-12 justify-between flex-col lg:flex-row gap-3 lg:gap-0'>
        <span className='text-gray-400'>
          Copyright Swash Bilet Basım ve Dağıtım A.Ş
        </span>
        <img className="w-96" src={iyzico} alt="" />
        <div className='flex gap-3 text-gray-400 items-center justify-center'>
          <span> Follow Us </span> <span> | </span>
          <div className='gap-1 flex '>
            <a href='https://www.instagram.com/swash.club/' target='_blank'>
              <IoLogoInstagram />
            </a>
            <a href='' target='_blank'>
              <IoLogoTwitter />
            </a>
            <a href='' target='_blank'>
              <IoLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
