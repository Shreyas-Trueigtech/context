import React from "react";
import { Routes, Route } from "react-router-dom";
import Employee from "@/features/employee/index";
import Kanban from "@/features/kanban/index";
import Admin from "@/features/admin/index";
import Login from "@/features/login/index";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
