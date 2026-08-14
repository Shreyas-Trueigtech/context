export const ADMIN_FORM_FIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter admin's full name",
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
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter admin's email",
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
    name: "phone",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter phone number",
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
    name: "employeeId",
    label: "Employee / Admin ID",
    type: "text",
    placeholder: "e.g. ADM-0231",
    defaultValue: "",
    rules: {
      required: "Employee ID is required",
    },
  },

  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    defaultValue: "",
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message: "Must include uppercase, lowercase, and a number",
      },
    },
  },

  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter password",
    defaultValue: "",
    rules: {
      required: "Please confirm the password",
      validate: (value, formValues) =>
        value === formValues.password || "Passwords do not match",
    },
  },

  {
    name: "role",
    label: "Admin Role",
    type: "select",
    defaultValue: "",
    placeholder: "Select a role",
    options: [
      { label: "Super Admin", value: "super_admin" },
      { label: "Admin", value: "admin" },
      { label: "Moderator", value: "moderator" },
      { label: "Support", value: "support" },
    ],
    rules: {
      required: "Please select a role",
    },
  },

  {
    name: "department",
    label: "Department",
    type: "select",
    defaultValue: "",
    placeholder: "Select department",
    options: [
      { label: "Operations", value: "operations" },
      { label: "Engineering", value: "engineering" },
      { label: "Sales", value: "sales" },
      { label: "Customer Support", value: "customer_support" },
      { label: "Finance", value: "finance" },
    ],
    rules: {
      required: "Please select a department",
    },
  },

  {
    name: "status",
    label: "Account Status",
    type: "radio",
    defaultValue: "active",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    rules: {
      required: "Please select account status",
    },
  },

  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    defaultValue: "",
    rules: {
      required: "Joining date is required",
    },
  },

  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter address",
    defaultValue: "",
    rules: {
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters",
      },
    },
  },

  {
    name: "sendCredentials",
    label: "Email login credentials to this admin",
    type: "checkbox",
    defaultValue: true,
  },
];