import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoIosClose, IoIosContact, IoMdMenu } from "react-icons/io";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
const Navbar = () => {
  const [showNav, setshowNav] = useState(false);
  const [userData, setUserData] = useState([]);
  const { user } = useAuthentication();
  const navigate = useNavigate();
  const handleClick = async () => {
    const querySnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
    const data = querySnapshot;
    if (data.exists()) {
      console.log("Document data:", data.data());
      setUserData(data.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    handleClick();
  }, []);
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
    <div className=' pb-4 mb-10  bg-mor z-10 w-full bg-opacity-30 '>
      <div className=' flex items-center w-full justify-center  pt-6 lg:justify-center container mx-auto px-48'>
        {/* <img
          className='lg:w-24 md:w-16 w-12 mr-3'
          onClick={() => handleLogout()}
          src={logo}
          alt='swash'
        /> */}
        <nav className='flex items-end w-full justify-between flex-row flex-1'>
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
          {/* Mobile */}
          {showNav ? (
            <ul className='animate-bounceCustom gap-3 items-center justify-center  left-0 top-0 flex flex-col bg-black  z-20 fixed w-full h-screen lg:hidden'>
              {" "}
              <li>
                {user ? (
                  <button className='text-white mr-3 text-lg flex items-center justify-center gap-4'>
                    <img
                      src={user.photoURL}
                      className='w-16 h-16 rounded-full border-2 border-solid border-white '
                      alt='name'
                    />{" "}
                    {user.displayName}{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/Register")}
                    className='text-white mr-3 text-lg flex items-center justify-center gap-2'
                  >
                    <IoIosContact className='text-3xl' /> Giriş Yap{" "}
                  </button>
                )}
              </li>{" "}
              <li className='text-white font-light text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 '>
                <Link to='/'> Anasayfa </Link>{" "}
              </li>{" "}
              <li className='text-white font-light text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 '>
                <Link to='/Contact'> İletişim </Link>{" "}
              </li>{" "}
              <li className='text-white font-light mr-5 text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 '>
                <Link to={user ? "/OrganisatorProfile" : "OrganisatorRegister"}>
                  {" "}
                  Organizatörlere Özel{" "}
                </Link>{" "}
              </li>
            </ul>
          ) : null}{" "}
          {/* Desktop */}
          <ul className=' gap-3 items-center justify-between w-full hidden lg:flex '>
            <img
              className='lg:w-24 md:w-16 w-12 mr-3'
              onClick={() => handleLogout()}
              src={logo}
              alt='swash'
            />
            <div className='flex gap-8'>
              {" "}
              <li className='text-white font-light text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 '>
                <Link to='/'> Anasayfa </Link>{" "}
              </li>{" "}
              <li className='text-white font-light text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 '>
                <Link to='/Contact'> İletişim </Link>{" "}
              </li>{" "}
              {userData.role === "organisation" || user === undefined ? (
                <li className='text-white font-light text-xl hover:border-mor border-transparent transition-all border-solid border-b-2 mr-5'>
                  <Link
                    to={
                      user
                        ? `/OrganisatorProfile/${user.displayName}`
                        : "OrganisatorRegister"
                    }
                  >
                    {" "}
                    Organizatörlere Özel{" "}
                  </Link>{" "}
                </li>
              ) : null}
            </div>
            {user ? (
              <button
                onClick={() => navigate("/" + user.displayName + "/Profile")}
                className='text-white mr-3 text-lg flex items-center justify-center gap-3'
              >
                <img
                  src={user.photoURL}
                  className='w-14 h-14 rounded-full border-2 border-solid border-white '
                  alt=''
                />{" "}
                {user.displayName}{" "}
              </button>
            ) : (
              <button
                onClick={() => navigate("/Register")}
                className='text-white mr-3 text-lg flex items-center justify-center gap-2'
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
