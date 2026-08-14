import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CommonSelect = ({
  options = [],
  placeholder = "Select an option",
  value,
  onValueChange,
  onBlur,
  name,
  isInvalid = false,
  triggerClassName = "w-full",
  contentLabel,
  ...props
}) => {
  return (
    <Select
      value={value ?? ""}
      onValueChange={onValueChange}
      onBlur={onBlur}
      name={name}
      aria-invalid={isInvalid}
      {...props}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {contentLabel ?? placeholder}
          </SelectLabel>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const CommonSelectField = ({ field, control, errors }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      rules={field.rules}
      defaultValue={field.defaultValue ?? ""}
      render={({ field: controllerField }) => (
        <CommonSelect
          options={field.options ?? []}
          placeholder={field.placeholder ?? "Select an option"}
          value={controllerField.value ?? ""}
          onValueChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
          name={controllerField.name}
          isInvalid={!!errors?.[field.name]}
          triggerClassName={field.triggerClassName}
          contentLabel={field.contentLabel}
        />
      )}
    />
  );
};

export default CommonSelectField;