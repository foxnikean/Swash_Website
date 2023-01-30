import React from "react";
import Navbar from "../components/Navbar";
import { useLocation, useParams } from "react-router";
import { IoIosCalendar, IoIosLocate, IoIosPin } from "react-icons/io";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const EventPage = () => {
  const { id } = useParams();
  const params = useLocation();
  const event = params.state.event;
  let date = format(new Date(event.eventDate), "do PPPP", { locale: tr });
  date = date.split(".").pop();
  console.log(date);
  return (
    <div className='bg-backgroundColor min-h-screen h-full min-w-screen'>
      <Navbar />
      <div className='mx-auto container pb-10 px-48'>
        <span className='text-white capitalize '>
          {event.eventType}ival / {event.eventName}
        </span>
        <div className='w-3/4 mt-14'>
          <img className='w-full' src={event.image} alt='' />
          <div className='mt-6 flex items-center gap-6'>
            <span className='flex items-center bg-turkuaz text-white text-xl py-5 flex-1 px-5 gap-2'>
              <IoIosPin className='text-4xl' /> {event.placeName}
            </span>
            <span className='flex items-center bg-turkuaz text-white text-xl py-5 flex-1 px-5 gap-2'>
              <IoIosCalendar className='text-4xl' /> {date}
            </span>
          </div>
          <div className=' bg-turkuaz mt-5 flex flex-col py-8 px-12 gap-5 text-white'>
            <span className="font-bold text-xl">Açıklama:</span>
            <span>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus quisquam eius eaque totam est sapiente quidem
              necessitatibus unde, facilis facere sit explicabo? Possimus sunt,
              rerum voluptatum, maiores incidunt autem aliquid fuga harum
              quisquam atque sapiente quos placeat ex odio enim quod cum. Sit,
              voluptates debitis sunt corrupti tempore ipsam. Illo optio, alias
              libero enim accusantium facere dolorum veritatis soluta ab
              deleniti doloremque facilis fugiat nam magnam temporibus. maxime,
              explicabo quisquam voluptatibus recusandae iste. Laboriosam
              architecto dolore unde, quae doloremque quam neque aspernatur
              perspiciatis commodi voluptate repellendus deserunt dolorum
              sapiente exercitationem, rerum est consectetur nulla Temporibus
              earum cumque omnis tempore illum.
            </span>
            <button className="text-mor border-[0.5px] rounded py-2 border-mor w-52">Devamını Oku</button>
          </div>
          <div className=' bg-turkuaz mt-5 flex flex-col py-8 px-12 text-white'>
            <span className="font-bold text-xl mb-5">Mekan:</span>
            <span>{event.placeName}</span>
            <span>{event.placeAddress}</span>
          </div>
          <div className=' bg-turkuaz mt-5 flex flex-col py-8 px-12 gap-5 text-white'>
            <span className="font-bold text-xl">Etkinlik Kuralları:</span>
            <span>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus quisquam eius eaque totam est sapiente quidem
              necessitatibus unde, facilis facere sit explicabo? Possimus sunt,
              rerum voluptatum, maiores incidunt autem aliquid fuga harum
              quisquam atque sapiente quos placeat ex odio enim quod cum. Sit,
              voluptates debitis sunt corrupti tempore ipsam. Illo optio, alias
              libero enim accusantium facere dolorum veritatis soluta ab
              deleniti doloremque facilis fugiat nam magnam temporibus. maxime,
              explicabo quisquam voluptatibus recusandae iste. Laboriosam
              architecto dolore unde, quae doloremque quam neque aspernatur
              perspiciatis commodi voluptate repellendus deserunt dolorum
              sapiente exercitationem, rerum est consectetur nulla Temporibus
              earum cumque omnis tempore illum.
            </span>
            <button className="text-mor border-[0.5px] rounded py-2 border-mor w-52">Devamını Oku</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
