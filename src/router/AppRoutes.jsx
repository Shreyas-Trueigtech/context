import Employee from "@/features/employee/employee";
import Kanban from "@/features/kanban/kanban";
import Admin from "@/features/admin/admin";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
};

export default AppRoutes;
