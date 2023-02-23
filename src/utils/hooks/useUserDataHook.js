import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';

const useUserDataHook = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const querySnapshot = getDoc(doc(db, "users", auth.currentUser.uid));
        const data = querySnapshot;
        if (data.exists()) {
          console.log("Document data:", data.data());
          setUserData(data.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }, []);
  return (
    userData
  )
}

export default useUserDataHook