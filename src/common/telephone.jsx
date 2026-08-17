import React from "react";
import { Textarea } from "@/components/ui/textarea";

const  CommonTelField  = ({
  isInvalid = false,
  className = "w-full border border-input px-3 py-2 text-sm",
  ...props
}) => {
  return <Textarea aria-invalid={isInvalid} className={className} {...props} />;
};

const CommonTelFieldField = ({ field, register, errors }) => {
  return (
    <CommonTelField 
      id={field.name}
      placeholder={field.placeholder}
      isInvalid={!!errors?.[field.name]}
      {...register(field.name, field.rules)}
    />
  );
};

export default CommonTelFieldField;
