import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoIosClose, IoIosContact, IoMdMenu } from "react-icons/io";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
const Navbar = () => {
  const [showNav, setshowNav] = useState(false);
  const { user } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Signed Out");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className=' pb-4 mb-10 border-b-2 border-solid border-neonBlue'>
      <div className=' flex items-center w-full justify-center  pt-8 lg:justify-center container mx-auto '>
        <img
          className='lg:w-24 md:w-16 w-12 mr-3'
          onClick={() => handleLogout()}
          src={logo}
          alt='swash'
        />
        <nav className='flex items-end justify-end flex-row flex-1'>
          {" "}
          {showNav ? (
            <button
              onClick={() => {
                setshowNav(!showNav);
              }}
              className='flex lg:hidden z-30 fixed '
            >
              <IoIosClose className='text-6xl text-white' />
            </button>
          ) : (
            <button
              onClick={() => {
                setshowNav(!showNav);
              }}
              className=' flex lg:hidden z-30 '
            >
              <IoMdMenu className='text-4xl text-white' />
            </button>
          )}{" "}
          {showNav ? (
            <ul className='animate-bounceCustom gap-3 items-center justify-center  left-0 top-0 flex flex-col bg-black  z-20 fixed w-full h-screen lg:hidden'>
              {" "}
              <li>
                {user ? (
                  <button className='text-neonBlue mr-3 text-lg flex items-center justify-center gap-2'>
                    <img src={user.photoURL} className="w-16 h-16 rounded-full border-2 border-solid border-neonBlue " alt='name' /> {user.displayName}{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/Register")}
                    className='text-neonBlue mr-3 text-lg flex items-center justify-center gap-2'
                  >
                    <IoIosContact className='text-3xl' /> Giriş Yap{" "}
                  </button>
                )}
              </li>{" "}
              <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
                <Link to='/'> Anasayfa </Link>{" "}
              </li>{" "}
              <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
                <Link to='/AddEvent'> Etkinlikler </Link>{" "}
              </li>{" "}
              <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
                <Link> İletişim </Link>{" "}
              </li>{" "}
              <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
                <Link> Organizatörlere Özel </Link>{" "}
              </li>
            </ul>
          ) : null}{" "}
          <ul className=' gap-3 items-center justify-center hidden lg:flex '>
            {" "}
            <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
              <Link to='/'> Anasayfa </Link>{" "}
            </li>{" "}
            <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
              <Link to='/AddEvent'> Etkinlikler </Link>{" "}
            </li>{" "}
            <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
              <Link> İletişim </Link>{" "}
            </li>{" "}
            <li className='text-white font-semibold text-xl hover:text-neonBlue transition-all'>
              <Link to='/AddEvent'> Organizatörlere Özel </Link>{" "}
            </li>{" "}
            {user ? (
              <button
                onClick={() => navigate("/" + user.displayName + "/Profile")}
                className='text-[#45E8FF] mr-3 text-lg flex items-center justify-center gap-2'
              >
                <img src={user.photoURL} className="w-16 h-16 rounded-full border-2 border-solid border-neonBlue "  alt='' />{" "}
                {user.displayName}{" "}
              </button>
            ) : (
              <button
                onClick={() => navigate("/Register")}
                className='text-[#45E8FF] mr-3 text-lg flex items-center justify-center gap-2'
              >
                <IoIosContact className='text-3xl' /> Giriş Yap{" "}
              </button>
            )}{" "}
          </ul>{" "}
        </nav>{" "}
      </div>
    </div>
  );
};

export default Navbar;
