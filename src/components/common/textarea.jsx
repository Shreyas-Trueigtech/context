import React from "react";
import { Textarea } from "@/components/ui/textarea";

const CommonTextarea = ({
  isInvalid = false,
  className = "w-full border border-input bg-background px-3 py-2 text-sm",
  ...props
}) => {
  return <Textarea aria-invalid={isInvalid} className={className} {...props} />;
};

const CommonTextareaField = ({ field, register, errors }) => {
  return (
    <CommonTextarea
      id={field.name}
      placeholder={field.placeholder}
      isInvalid={!!errors?.[field.name]}
      {...register(field.name, field.rules)}
    />
  );
};

export default CommonTextareaField;
