export const LOGIN_FORM_FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    description:
      "We\'ll use this to contact you. We will not share your email with anyone else.",
    defaultValue: "",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
  },
  //  {
  //   name: "name",
  //   label: "Name",
  //   type: "text",
  //   description:
  //     "We\'ll use this to contact you. We will not share your email with anyone else.",
  //   defaultValue: "",
  //   rules: {
  //     required: "Name is required",
  //     pattern: {
  //       value: 5,
  //       message: "Invalid Name address",
  //     },
  //   },
  // },
  {
    name: "password",
    label: "Password",
    type: "password",
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
