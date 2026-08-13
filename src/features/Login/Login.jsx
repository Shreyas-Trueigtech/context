import React from "react";
import LoginForm from "./components/loginForm";
import { useLoginForm } from "./hook/useLoginForm";

const Login = () => {
  const {
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

export default Login;
