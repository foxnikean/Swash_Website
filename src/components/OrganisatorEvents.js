import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
const OrganisatorEvents = () => {
  const [events, setEvents] = useState([]);
  const handleClick = async () => {
    const querySnapshot = await getDocs(
      collection(db, "events", "organisatorevents", auth.currentUser.uid)
    );
    setEvents(querySnapshot.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div>
      <div>
        {events.map((event) => (
          <div className='text-black'>
            <img src={event.image} alt='' />
            <span>{event.eventName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganisatorEvents;
