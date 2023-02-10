import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoIosAnalytics, IoIosCalendar, IoIosPin } from "react-icons/io";
import { db } from "../utils/firebase";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const MyTickets = () => {
    const [events, setevents] = useState([]);
    const handleClick = async () => {
        const querySnapshot = await getDocs(collection(db, "events"));
        // console.log(querySnapshot._firestore._authCredentials.auth.auth);
        console.log(querySnapshot);
        setevents(querySnapshot.docs.map((doc) => doc.data()));
      };
      useEffect(() => {
        handleClick();
      }, []);
  return (
    <div className='text-black'>
      {" "}
      <div className='flex flex-col gap-8 pt-16'>
        {events.map((event) => (
          <div className='text-black flex bg-white items-center justify-between text-2xl p-3 rounded-3xl  gap-3'>
            <img className='w-32 h-32 rounded-2xl' src={event.image} alt='' />
            <div className='flex flex-col gap-5'>
              <span className='flex items-center gap-2'>
                <IoIosPin /> {event.placeName}
              </span>
              <span className='flex items-center gap-2'>
                <IoIosCalendar />
                {format(new Date(event.eventDate), "do PPPP", { locale: tr })
                  .split(".")
                  .pop()}
              </span>
            </div>
            <button className=' bg-lightPurple  border-solid border-2 rounded-xl border-transparent w-64 text-sm  shadow-md shadow-mor  transition-all py-2 px-6 text-white'>
              <span className='font-semibold'> {event.tickets[0].price} ₺</span>
              <span> 'den Başlayan Fiyatlarla </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
