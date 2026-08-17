import React from "react";
import LoginForm from "./components/loginForm";
import { useLoginForm } from "./hook/useLoginForm";

const login = () => {
  const loginFormProps = useLoginForm();

  return <LoginForm {...loginFormProps} />;
};

export default login;
