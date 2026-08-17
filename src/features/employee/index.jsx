import React from "react";
import EmployeeForm from "./components/employeeForm";
import { useLoginForm } from "./hook/useEmployeeForm";

const Employee = () => {
  const employeeFormProps = useLoginForm();

  return <EmployeeForm {...employeeFormProps} />;
};

export default Employee;
