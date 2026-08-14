import React from "react";
import EmployeeForm from "./components/employeeForm";
import { useLoginForm } from "./hook/useEmployeeForm";

const Employee = () => {
  const {
    formHeader,
    fields,
    user,
    theme,
    toggleTheme,
    register,
    control,
    errors,
    onSubmit,
  } = useLoginForm();

  return (
    <EmployeeForm
      formHeader={formHeader}
      fields={fields}
      register={register}
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      user={user}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
};

export default Employee;
