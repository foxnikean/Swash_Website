import React from "react";
import Navbar from "../components/Navbar";
import { useLocation, useParams } from "react-router";

const EventPage = () => {
  const { id } = useParams();
  const params = useLocation();
  console.log(params.state.events[0].name);
  return (
    <div className='bg-black min-h-screen h-full min-w-screen'>
      <div className="mx-auto container">
        <Navbar />
      </div>
    </div>
  );
};

export default EventPage;
