import React from "react";
import party from "../../assets/partyex.png";
import qr from "../../assets/qr.png";
import { IoIosCalendar, IoIosPin } from "react-icons/io";
const TicketCard = () => {
  return (
    <div className='w-full bg-slate-200 flex p-4 rounded-lg items-center justify-between'>
      <div className='flex gap-6 items-center'>
        <img className='w-80 rounded-lg' src={party} alt='' />
        <div className="flex-col flex gap-7">
          <h3 className='text-4xl font-bold'>90's Flashback</h3>
          <span className='flex items-center text-2xl gap-3'>
            <IoIosPin /> Zorlu PSM - Turkcell Sahnesi
          </span>
          <span className='flex items-center text-2xl gap-3'>
            <IoIosCalendar />
            Çrş, 25 Ocak 2023 21:00
          </span>
        </div>
      </div>
      <img className="rounded-lg" src={qr} alt='' />
    </div>
  );
};

export default TicketCard;
