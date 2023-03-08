import { Route, Routes } from "react-router";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import EventPage from "./components/EventPage";
import AddEventPage from "./components/AddEventPage";
import AddProfilePic from "./components/AddProfilePic";
import useAuthentication from "./utils/hooks/UseAuthHook";
import OrganisatorRegister from "./components/OrganisatorRegister";
import OrganisatorRegisterContinue from "./components/OrganisatorRegisterContinue";
import OrganisatorProfile from "./components/OrganisatorProfile";
import OrganisatorEvents from "./components/OrganisatorEvents";
import EditEvent from "./components/EditEvent";
import Contact from "./components/Contact";
import { ProfileRoute } from "./components/ProfileRoute";
import { BrowserRouter } from "react-router-dom";
// Leaflet
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebase";
import { useEffect, useState } from "react";
import Agreement from "./components/Agreement";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

function App() {
  const { user } = useAuthentication();
  const [userData, setUserData] = useState([]);

  const handleClick = async () => {
    const querySnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
    const data = querySnapshot;
    if (data.exists()) {
      console.log("Document data:", data.data());
      setUserData(data.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    handleClick();
  }, [user]);

  return user ? (
    <Routes>
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/:id/Profile' element={<Profile />} />{" "}
      <Route path='/AddProfilePic' element={<AddProfilePic />} />{" "}
      <Route path='/Agreement/:id' element={<Agreement />} />{" "}
      <Route path="/Checkout" element={<Cart/>}/>
      {userData.role === "organisation" ? (
        <Route path='/AddEvent' element={<AddEventPage />} />
      ) : null}
      {userData.role === "organisation" ? (
        <Route
          path='/OrganisatorRegisterContinue'
          element={<OrganisatorRegisterContinue />}
        />
      ) : null}
      {userData.role === "organisation" ? (
        <Route
          path='/OrganisatorProfile/:id'
          element={<OrganisatorProfile />}
        />
      ) : null}
      {userData.role === "organisation" ? (
        <Route path='/OrganisatorEvents' element={<OrganisatorEvents />} />
      ) : null}
      {userData.role === "organisation" ? (
        <Route path='/EditEvent/:id' element={<EditEvent />} />
      ) : null}
      <Route path='/Event/:id' element={<EventPage />} />{" "}
      <Route path='/Contact' element={<Contact />} />{" "}
      <Route path='*' element={<NotFound />} />
    </Routes>
  ) : (
    <Routes>
        <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/Agreement/:id' element={<Agreement />} />{" "}
      <Route path='/Register' element={<RegisterPage />} />{" "}
      <Route path='/Event/:id' element={<EventPage />} />{" "}
      <Route path='/Login' element={<LoginPage />} />{" "}
      <Route path='/Resetpass' element={<ResetPassword />} />{" "}
      <Route path='/OrganisatorRegister' element={<OrganisatorRegister />} />{" "}
      <Route path='/Contact' element={<Contact />} />{" "}
    </Routes>
  );
}

export default App;
