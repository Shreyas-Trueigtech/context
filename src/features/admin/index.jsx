import React from "react";
import AdminForm from "./components/adminForm";
import { useAdminForm } from "./hook/useAdminForm";

const Admin = () => {
  const adminFormProps = useAdminForm();

  return <AdminForm {...adminFormProps} />;
};

export default Admin;
