import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";
import CarouselComponent from "./CarouselComponent";
import LittlePartyBox from "./LittlePartyBox";
import Footer from "./Footer";
import EventContainer from "./EventContainer";
const Homepage = () => {
  return (
    <div className='bg-backgroundColor min-h-screen h-full min-w-screen'>
        <Navbar />
      <div className='container mx-auto '>
        <CarouselComponent  />
        <EventContainer />
        {/* <div className='flex gap-64 flex-row text-white items-center justify-center lg:justify-between mt-16 flex-wrap'>
          <div className=''>
            <h3 className='text-3xl font-bold mb-16'>Yaklaşan Etkinlikler</h3>
            <ul className='flex-row flex-wrap lg:flex-col gap-32 flex items-center justify-center'>
              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>
              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>

              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>
            </ul>
          </div>
          <div className='flex-1 flex items-center flex-col'>
            <h3 className='text-3xl font-bold self-start'>Aktif Chatler</h3>
            <div className='mt-16 w-full  text-black flex items-center flex-col gap-16'>
              <button className='w-3/4 bg-neonBlue h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-neonBlue h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-neonBlue h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-neonBlue h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
            </div>
          </div>
        </div> */}
        {/* <button
          onClick={() => {
            signOut(auth)
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error happened.
            });
          }}
          >
          Log out
        </button> */}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
