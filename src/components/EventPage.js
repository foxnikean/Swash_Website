import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useParams } from "react-router";
import {
  IoIosAdd,
  IoIosCalendar,
  IoIosLocate,
  IoIosPin,
  IoIosRemove,
} from "react-icons/io";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import axios from "axios";
import Map from "./Map";
import { Marker } from "mapbox-gl";
const EventPage = () => {
  const { id } = useParams();
  const params = useLocation();
  const event = params.state.event;
  const [counts, setCounts] = useState([]);
  let date = format(new Date(event.eventDate), "do PPPP", { locale: tr });
  date = date.split(".").pop();
  console.log(date);
  useEffect(() => {
    let eventsArray = [];
    event.tickets.map((ticket, i) => eventsArray.push(1));
    setCounts(eventsArray);
    
  }, []);

  function handleIncrementClick(index) {
    const nextCounters = counts.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounts(nextCounters);
  }

  function handleDecrementClick(index) {
    const nextCounters = counts.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c - 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounts(nextCounters);
  }

  return (
    <div className='bg-backgroundColor min-h-screen h-full min-w-screen'>
      <Navbar />
      <div className='flex mx-auto container px-48 relative'>
        <div className=' pb-10 w-5/6'>
          <span className='text-white capitalize '>
            {event.eventType}ival / {event.eventName}
          </span>
          <div className='w-3/4 mt-14'>
            <img className='w-full' src={event.image} alt='' />
            <div className='mt-6 flex items-center gap-6'>
              <div className='flex items-center bg-mor bg-opacity-50 text-white text-xl py-5 flex-1 px-5 gap-2'>
                <span>
                  <IoIosPin className='text-4xl' />
                </span>
                <span className='whitespace-nowrap'>{event.placeName}</span>
              </div>
              <span className='flex items-center bg-mor bg-opacity-50 text-white text-xl py-5 flex-1 px-5 gap-2'>
                <IoIosCalendar className='text-4xl' /> {date}
              </span>
            </div>
            <div className=' bg-mor bg-opacity-50 mt-5 flex flex-col py-8 px-12 gap-5 text-white'>
              <span className='font-bold text-xl'>Açıklama:</span>
              <span>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus quisquam eius eaque totam est sapiente quidem
                necessitatibus unde, facilis facere sit explicabo? Possimus
                sunt, rerum voluptatum, maiores incidunt autem aliquid fuga
                harum quisquam atque sapiente quos placeat ex odio enim quod
                cum. Sit, voluptates debitis sunt corrupti tempore ipsam. Illo
                optio, alias libero enim accusantium facere dolorum veritatis
                soluta ab deleniti doloremque facilis fugiat nam magnam
                temporibus. maxime, explicabo quisquam voluptatibus recusandae
                iste. Laboriosam architecto dolore unde, quae doloremque quam
                neque aspernatur perspiciatis commodi voluptate repellendus
                deserunt dolorum sapiente exercitationem, rerum est consectetur
                nulla Temporibus earum cumque omnis tempore illum.
              </span>
              <button className='text-mor border-[0.5px] rounded py-2 border-mor w-52'>
                Devamını Oku
              </button>
            </div>
            <div className=' bg-mor bg-opacity-50 mt-5 flex flex-col py-8 px-12 text-white'>
              <span className='font-bold text-xl mb-5'>Mekan:</span>
              <span>{event.placeName}</span>
              <span>{event.placeAddress}</span>
              <div className="relative">
                <IoIosPin className="absolute left-1/2 bottom-1/2 text-3xl z-20"/>
              <Map/>
              </div>

            </div>
            <div className=' bg-mor bg-opacity-50 mt-5 flex flex-col py-8 px-12 gap-5 text-white'>
              <span className='font-bold text-xl'>Etkinlik Kuralları:</span>
              <span>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus quisquam eius eaque totam est sapiente quidem
                necessitatibus unde, facilis facere sit explicabo? Possimus
                sunt, rerum voluptatum, maiores incidunt autem aliquid fuga
                harum quisquam atque sapiente quos placeat ex odio enim quod
                cum. Sit, voluptates debitis sunt corrupti tempore ipsam. Illo
                optio, alias libero enim accusantium facere dolorum veritatis
                soluta ab deleniti doloremque facilis fugiat nam magnam
                temporibus. maxime, explicabo quisquam voluptatibus recusandae
                iste. Laboriosam architecto dolore unde, quae doloremque quam
                neque aspernatur perspiciatis commodi voluptate repellendus
                deserunt dolorum sapiente exercitationem, rerum est consectetur
                nulla Temporibus earum cumque omnis tempore illum.
              </span>
              <button className='text-mor border-[0.5px] rounded py-2 border-mor w-52'>
                Devamını Oku
              </button>
            </div>
          </div>
        </div>
        <div className='w-1/4 flex flex-col items-center right-56 top-64 p-4 fixed bg-slate-200 rounded-md'>
          <span className='border-b-2 border-mor w-5/6 text-center font-bold text-2xl'>
            {event.eventName}
          </span>
          <div className='flex flex-col gap-5 mt-5 w-full'>
            {event.tickets.map((ticket, i) => (
              <div className='flex w-full justify-between px-5 items-center border-b-2 border-mor pb-2'>
                <div className='flex flex-col text-sm'>
                  <span>{ticket.name}</span>
                  <span className='font-bold'>{ticket.price} ₺</span>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    className='text-3xl font-bold text-mor'
                    onClick={() => {
                      handleDecrementClick(i);
                    }}
                  >
                    <IoIosRemove />
                  </button>
                  <span className='bg-slate-600 text-white py-1 border-4 rounded-md border-mor select-none w-12 text-center'>
                    {counts[i]}
                  </span>
                  <button
                    className='text-3xl font-bold text-mor'
                    onClick={() => {
                      handleIncrementClick(i);
                    }}
                  >
                    <IoIosAdd />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
