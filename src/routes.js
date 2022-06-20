import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/Profile";
import Users from "./components/Users";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />}></Route>
      <Route path="/user/:login" element={<UserProfile />}></Route>
    </Routes>
  );
};
