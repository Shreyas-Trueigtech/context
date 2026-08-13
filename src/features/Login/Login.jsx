import React, { useEffect } from "react";
import { useAppState } from "@/context";
import LoginForm from "./components/LoginForm";
import { LOGIN_FORM_FIELDS } from "./constant/loginFormConstants";
import { useLoginForm } from "./hook/useLoginForm";

const Login = () => {
  const { user, setUser, theme, toggleTheme } = useAppState();

  const handleUserSubmit = (data) => {
    const newUser = {
      ...data,
      name: data.name ?? data.email?.split("@")[0] ?? "",
    };

    setUser(newUser);
  };

  const { register, errors, onSubmit } = useLoginForm({
    fields: LOGIN_FORM_FIELDS,
    onSubmitUser: handleUserSubmit,
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      birthday: user?.birthday ?? "",
      address: user?.address ?? "",
      gender: user?.gender ?? "",
      nationality: user?.nationality ?? "",
      terms: user?.terms ?? false,
    },
  });

  useEffect(() => {
    console.log("User updated in context:", user);
  }, [user]);

  return (
    <LoginForm
      fields={LOGIN_FORM_FIELDS}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      user={user}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
};

export default Login;