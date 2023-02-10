import React from "react";
import { Route, Routes } from "react-router";
import Profile from "./Profile";
import ProfileGeneral from "./profileComponents/ProfileGeneral";
import MyTickets from "./MyTickets";

export const ProfileRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProfileGeneral />} />{" "}
        <Route path='tickets' element={<div>
          <span>Salih Mert</span>
        </div>} />
      </Routes>{" "}
    </div>
  );
};
