import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const user = localStorage.getItem("user");
  console.log("user Guest Route", user);

  if (user) {
    return <Navigate to="/employee" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
