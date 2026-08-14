import React from "react";
import LoginForm from "./components/loginForm";
import { useLoginForm } from "./hook/useloginForm";

const login = () => {
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
    <LoginForm
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

export default login;
