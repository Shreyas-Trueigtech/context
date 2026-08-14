import React from "react";
import EemployeeForm from "./components/employeeForm";
import { useLoginForm } from "./hook/useLoginForm";

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
    <EemployeeForm
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
