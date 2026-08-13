import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../../context/user/userContext";
import ThemeContext from "../../context/theme/themeContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const { theme, setTheme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const newUser = {
      email: data.email,
      name: data.email.split("@")[0],
      password: data.password,
    };

    setUser(newUser);
  };

  useEffect(() => {
    console.log("User updated in context:", user);
  }, [user]);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-gray-400 rounded-2xl gap-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div className="border border-gray-400 rounded-2xl gap-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
