import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/Login/login";
import Kanban from "../features/kanban/kanban";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;