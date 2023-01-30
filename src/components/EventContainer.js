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
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    console.log(querySnapshot);
    setevents(querySnapshot.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div className="container mx-auto px-16">
      <h3 className='text-white  mt-10 text-3xl font-bold mb-8'>
        Yaklaşan Etkinlik
      </h3>
      <Carousel
        infinite={true}
        responsive={responsive}
        removeArrowOnDeviceType={["mobile"]}
        ssr
        customLeftArrow={
          <IoIosArrowBack className='absolute top-50 left-36 cursor-pointer text-6xl text-white rounded  h-full bg-opacity-30 ' />
        }
        customRightArrow={
          <IoIosArrowForward className='absolute right-28 top-50 cursor-pointer  text-6xl rounded text-white  rounded-l h-full bg-opacity-50' />
        }
        className='cursor-pointer  '
      >
        {events.map((event) => (
          <div
            onClick={() => {
              navigate(`/Event/${event.eventName}`, { state: { event } });
            }}
            className='  bg-white pb-3 w-5/6 rounded-3xl flex  flex-col gap-2 mx-4 select-none'
          >
            <img
              className=' mb-1 rounded-t-3xl h-44  pointer-events-none '
              src={event.image}
              alt=''
            />
            <span className='self-center font-medium text-xl '>
              {event.eventName}
            </span>
            <div className="flex flex-col border-t-[1px] pt-3">
              <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                <IoIosPin /> {event.placeName}
              </div>
              <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                <IoIosCalendar /> {event.eventDate} {event.eventTime}
              </div>
            </div>
            <div className='flex items-center w-full  justify-center px-2'>
              <button className=' bg-lightPurple  border-solid border-2 rounded-xl border-transparent  shadow-md shadow-mor  transition-all py-2 text-white w-full'>
                <span className='font-semibold'> {event.ticketPrice} ₺</span>
                <span> 'den Başlayan Fiyatlarla </span>
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EventContainer;
