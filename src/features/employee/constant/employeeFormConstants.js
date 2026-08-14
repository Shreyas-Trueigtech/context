export const LOGIN_FORM_FIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    defaultValue: "",
    rules: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
  }, 

  {
    name: "phone",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter your phone number",
    defaultValue: "",
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Phone number must be 10 digits",
      },
    },
  },

  {
    name: "birthday",
    label: "Birthday",
    type: "date",
    defaultValue: "",
    rules: {
      required: "Birthday is required",
    },
  },

  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter your address",
    defaultValue: "",
    rules: {
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters",
      },
    },
  },

  {
    name: "gender",
    label: "Gender",
    type: "radio",
    defaultValue: "",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
    ],
    rules: {
      required: "Please select your gender",
    },
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "select",
    defaultValue: "",
    placeholder: "Select your nationality",
    options: [
      {
        label: "Indian",
        value: "indian",
      },
      {
        label: "Foreign",
        value: "foreign",
      },
    ],
    rules: {
      required: "Please select your nationality",
    },
  },
  {
    name: "terms",
    label: "I agree to the Terms and Conditions",
    type: "checkbox",
    defaultValue: false,
    rules: {
      required: "You must accept the terms and conditions",
    },
  },
];
