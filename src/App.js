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

function App() {
  const { user } = useAuthentication();

  return user ? (
    <Routes>
      {" "}
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/:id/Profile' element={<Profile />} />{" "}
      <Route path='/AddProfilePic' element={<AddProfilePic />} />{" "}
      <Route path='/AddEvent' element={<AddEventPage />} />{" "}
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Homepage />} />{" "}
      <Route path='/Register' element={<RegisterPage />} />{" "}
      <Route path='/Login' element={<LoginPage />} />{" "}
      <Route path='/Resetpass' element={<ResetPassword />} />{" "}
      <Route path='/Event/:id' element={<EventPage />} />{" "}
    </Routes>
  );
}

export default App;
