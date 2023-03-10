import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  IoIosAddCircle,
  IoIosAnalytics,
  IoIosCalendar,
  IoIosPin,
} from "react-icons/io";
import { Link } from "react-router-dom";
import OrganisatorNavbar from "./OrganisatorNavbar";

const OrganisatorEvents = () => {
  const [events, setEvents] = useState([]);
  const handleClick = () => {
    const eventRef = collection(db,"events")
    const q = query(eventRef,where("organisatorUID", "==", auth.currentUser.uid))
    onSnapshot(q, (snapshot) =>{
      let gates = []
      snapshot.docs.forEach((doc) =>{
        gates.push({...doc.data(),id:doc.id})
      })
      console.log(gates)
      setEvents(gates)
    })
    console.log(q)
  };
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className='bg-backgroundColor min-h-screen'>
      <OrganisatorNavbar />
      <div className='container mx-auto px-48'>
        <div className='flex flex-col gap-8 pt-20'>
          {events.map((event) => (
            <div className='text-black flex bg-white items-center justify-between text-2xl p-8 rounded-3xl  gap-3'>
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
              <button className=' bg-lightPurple  border-solid border-2 rounded-xl border-transparent  shadow-md shadow-mor  transition-all py-2 px-6 text-white'>
                <span className='font-semibold'> {event.ticketPrice} ???</span>
                <span> 'den Ba??layan Fiyatlarla </span>
              </button>
              <div className='flex-col flex justify-between gap-5'>
                <Link className='flex items-center gap-2'>
                  <IoIosAnalytics /> Statistics
                </Link>
                <Link
                  to={`/EditEvent/${event.eventName}`}
                  className='flex items-center gap-2'
                >
                  <IoIosAddCircle /> Edit
                </Link>
              </div>
            </div>
))}
        </div>
      </div>
    </div>
  );
};

export default OrganisatorEvents;
