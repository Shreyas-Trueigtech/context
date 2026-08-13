import React from "react";
import { Input } from "@/components/ui/input";

const CommonInput = ({ isInvalid = false, ...props }) => {
  return <Input aria-invalid={isInvalid} {...props} />;
};

export default CommonInput;
