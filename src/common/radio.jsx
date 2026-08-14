import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CommonRadioGroup = ({
  options = [],
  value,
  onValueChange,
  onBlur,
  isInvalid = false,
  className = "flex gap-4",
  name,
}) => {
  return (
    <RadioGroup
      value={value ?? ""}
      onValueChange={onValueChange}
      onBlur={onBlur}
      aria-invalid={isInvalid}
      className={className}
      name={name}
    >
      {options.map((option) => {
        const optionId = `${name}-${option.value}`;

        return (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={option.value}
              id={optionId}
            />

            <Label htmlFor={optionId} className="text-sm">
              {option.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

const CommonRadioField = ({ field, control, errors }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      rules={field.rules}
      defaultValue={field.defaultValue ?? ""}
      render={({ field: controllerField }) => (
        <CommonRadioGroup
          options={field.options ?? []}
          value={controllerField.value ?? ""}
          onValueChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
          name={controllerField.name}
          isInvalid={!!errors?.[field.name]}
          className={field.className}
        />
      )}
    />
  );
};

export default CommonRadioField;