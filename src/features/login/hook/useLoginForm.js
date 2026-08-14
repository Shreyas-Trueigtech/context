import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppState } from "@/context";
import { LOGIN_FORM_FIELDS } from "../constant/loginFormConstants";
import { useNavigate } from "react-router-dom";

const makeValuesFromFields = (fields, source = {}) => {
  return fields.reduce((acc, field) => {
    const name = field?.name;

    if (!name) {
      return acc;
    }

    const fieldDefault = field?.defaultValue ?? "";
    acc[name] = source?.[name] ?? fieldDefault;

    return acc;
  }, {});
};

const formHeader = {
  title: "Welcome Back",
  description: "Enter your email and password to sign in to your account.",
};

export const useLoginForm = () => {
  const { user, setUser, theme, toggleTheme } = useAppState();

  const defaultValues = useMemo(
    () => makeValuesFromFields(LOGIN_FORM_FIELDS, user),
    [user],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit((data) => {
    const newUser = {
      ...data,
    };

    setUser(newUser);
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/employee");
    }
    // console.log("User updated in context:", user);
  }, [user]);

  return {
    formHeader,
    fields: LOGIN_FORM_FIELDS,
    user,
    theme,
    toggleTheme,
    register,
    control,
    errors,
    onSubmit,
  };
};
