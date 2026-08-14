export const LOGIN_FORM_FIELDS = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    defaultValue: "",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },

  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    defaultValue: "",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];
