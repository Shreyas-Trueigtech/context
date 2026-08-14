import CommonForm from "@/components/common/form";
import React from "react";

const EemployeeForm = ({
  formHeader,
  fields,
  register,
  control,
  errors,
  onSubmit,
  user,
  theme,
  toggleTheme,
}) => {
  return (
    <CommonForm
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

export default EemployeeForm;
