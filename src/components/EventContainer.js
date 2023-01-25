import React, { useEffect, useState } from "react";
import partyex from "../assets/partyex.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCalendar,
  IoIosClock,
  IoIosPin,
} from "react-icons/io";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { async } from "@firebase/util";
const EventContainer = () => {
  const [events, setevents] = useState([]);
  const navigate = useNavigate();
  const Party = "Party1";

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    setevents(
      querySnapshot.docs.map((doc) => ({
        img: doc.data().imageURL,
      }))
    );
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div className=''>
      <h3 className='text-white text-3xl font-bold mb-8'>
        Yaklaşan Etkinlikler{" "}
      </h3>
      {/* <Carousel
        infinite={true}
        responsive={responsive}
        removeArrowOnDeviceType={["mobile"]}
        centerMode={true}
        customLeftArrow={
          <IoIosArrowBack className='absolute top-0 left-0 cursor-pointer text-6xl text-neonBlue bg-black h-full bg-opacity-90' />
        }
        customRightArrow={
          <IoIosArrowForward className='absolute top-0 right-0 cursor-pointer  text-6xl text-neonBlue bg-black h-full bg-opacity-90' />
        }
        className='cursor-pointer'
        swipeable={true}
        draggable={true}
      >
        {events.map((event) => (
          <div
            onClick={() => {
              navigate(`/Event/${Party}`, { state: { events } });
            }}
            className=' w-72 h-80 bg-[#354153] pb-3 rounded-md flex flex-col gap-3 mx-4 select-none'
          >
            <img
              className=' mb-3 rounded-t h-44 pointer-events-none '
              src={partyex}
              alt=''
            />
            <div className='text-gray-200 text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
              <IoIosPin />
              {event.location}
            </div>
            <div className='text-gray-200 text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
              <IoIosCalendar />
              {event.date} {event.time}
            </div>
            <div className='flex items-center w-full  justify-center px-2'>
              <button className=' bg-[#08BCD6] hover:border-neonBlue border-solid border-2 border-transparent transition-all   py-2 rounded text-black w-full'>
                <span className='font-semibold'>{event.tickets[0]} ₺</span>
                <span>'den Başlayan Fiyatlarla </span>
              </button>
            </div>
          </div>
        ))}
      </Carousel> */}
    </div>
  );
};

export default EventContainer;
