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
import Map from "./Map";
const EventPage = () => {
  const { id } = useParams();
  const params = useLocation();
  const event = params.state.event;
  const [counts, setCounts] = useState([]);
  const [total, setTotal] = useState([]);
  const [sum, setSum] = useState();
  let date = format(new Date(event.eventDate), "do PPPP", { locale: tr });
  date = date.split(".").pop();
  console.log(date);
  useEffect(() => {
    let eventsArray = [];
    event.tickets.map((ticket, i) => eventsArray.push(0));
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
    setTotal([...total, event.tickets[index].price]);
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
    setTotal([...total, event.tickets[index].price]);
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
              <span>{event.eventDesc}</span>
              <button className='text-white border-[0.5px] rounded py-2 border-white w-52'>
                Devamını Oku
              </button>
            </div>
            <div className=' bg-mor bg-opacity-50 mt-5 flex flex-col py-8 px-12 text-white'>
              <span className='font-bold text-xl mb-5'>Mekan:</span>
              <span>{event.placeName}</span>
              <span>{event.placeAddress}</span>
              <div className='relative mt-8'>
                <Map address={event.placeName} />
              </div>
            </div>
            <div className=' bg-mor bg-opacity-50 mt-5 flex flex-col py-8 px-12 gap-5 text-white'>
              <span className='font-bold text-xl'>Etkinlik Kuralları:</span>
              <span> {event.eventRules}</span>
              <button className='text-white border-[0.5px] rounded py-2 border-white w-52'>
                Devamını Oku
              </button>
            </div>
          </div>
        </div>
        <div className='w-1/4 flex flex-col items-center right-56 top-64 p-4 fixed bg-white bg-opacity-30 rounded-md'>
          <span className='border-b-2 border-white text-white pb-3 w-5/6 text-center font-bold text-2xl'>
            {event.eventName}
          </span>
          <div className='flex flex-col gap-5 mt-5 w-full'>
            {event.tickets.map((ticket, i) => (
              <div className='flex w-full justify-between px-5 items-center border-b-[0.5px] text-white border-white  pb-2'>
                <div className='flex flex-col text-sm'>
                  <span>{ticket.name}</span>
                  <span className='font-bold'>{ticket.price} ₺</span>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    className='text-3xl font-bold text-white'
                    onClick={() => {
                      handleDecrementClick(i);
                    }}
                  >
                    <IoIosRemove />
                  </button>
                  <span className='bg-slate-600 text-white py-1 border-2 rounded-md border-white select-none w-12 text-center'>
                    {counts[i]}
                  </span>
                  <button
                    className='text-3xl font-bold text-white'
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
          <div>
            <div>
              <span>Ara Toplam</span>{" "}
              <span>
                {total.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
