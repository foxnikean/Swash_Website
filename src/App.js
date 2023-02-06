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

function App() {
  const { user } = useAuthentication();

  return user ? (
    <Routes>
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/:id/Profile' element={<Profile />} />{" "}
      <Route path='/AddProfilePic' element={<AddProfilePic />} />{" "}
      <Route path='/AddEvent' element={<AddEventPage />} />{" "}
      <Route path='/OrganisatorRegisterContinue' element={< OrganisatorRegisterContinue/>} />
      <Route path='/OrganisatorProfile/:id' element={< OrganisatorProfile/>} />{" "}
      <Route path='/OrganisatorEvents' element={< OrganisatorEvents/>} />{" "}
      <Route path='/Event/:id' element={<EventPage />} />{" "}
      <Route path='/EditEvent/:id' element={<EditEvent />} />{" "}
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/Register' element={<RegisterPage />} />{" "}
      <Route path='/Event/:id' element={<EventPage />} />{" "}
      <Route path='/Login' element={<LoginPage />} />{" "}
      <Route path='/Resetpass' element={<ResetPassword />} />{" "}
      <Route path='/OrganisatorRegister' element={<OrganisatorRegister />} />{" "}
    </Routes>
  );
}

export default App;
