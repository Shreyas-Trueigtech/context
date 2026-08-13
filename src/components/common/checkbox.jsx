import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CommonCheckbox = ({
  id,
  label,
  checked = false,
  onCheckedChange,
  onBlur,
  isInvalid = false,
  className = "flex items-center gap-2",
}) => {
  return (
    <div className={className}>
      <Checkbox
        id={id}
        checked={Boolean(checked)}
        onCheckedChange={onCheckedChange}
        onBlur={onBlur}
        aria-invalid={isInvalid}
      />

      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

const CommonCheckboxField = ({ field, control, errors }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      rules={field.rules}
      defaultValue={field.defaultValue ?? false}
      render={({ field: controllerField }) => (
        <CommonCheckbox
          id={field.name}
          label={field.label}
          checked={Boolean(controllerField.value)}
          onCheckedChange={(checked) =>
            controllerField.onChange(Boolean(checked))
          }
          onBlur={controllerField.onBlur}
          isInvalid={!!errors?.[field.name]}
        />
      )}
    />
  );
};

export default CommonCheckboxField;