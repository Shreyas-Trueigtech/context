import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  CommonInput,
  CommonTextareaField,
  CommonSelectField,
  CommonRadioField,
  CommonCheckboxField,
} from "@/components/common";

const CommonForm = ({
  formHeader="",
  fields,
  register,
  control,
  errors,
  onSubmit=(()=>{}),
}) => {
  const controlRenderers = {
    textarea: (field) => (
      <CommonTextareaField field={field} register={register} errors={errors} />
    ),
    select: (field) => (
      <CommonSelectField field={field} control={control} errors={errors} />
    ),
    radio: (field) => (
      <CommonRadioField field={field} control={control} errors={errors} />
    ),
    checkbox: (field) => (
      <CommonCheckboxField field={field} control={control} errors={errors} />
    ),
  };

  const defaultRenderer = (field) => (
    <CommonInput
      id={field.name}
      type={field.type}
      placeholder={field.placeholder}
      isInvalid={!!errors[field.name]}
      {...register(field.name, field.rules)}
    />
  );

  const showLabelByType = {
    checkbox: false,
  };

  const renderFieldControl = (field) => {
    const renderer = controlRenderers[field?.type] ?? defaultRenderer;
    return renderer(field);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>{formHeader?.title}</CardTitle>
              <CardDescription>{formHeader?.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <FieldSet>
                {fields.map((field) => (
                  <Field key={field?.name} data-invalid={!!errors[field?.name]}>
                    {(showLabelByType[field?.type] ?? true) ? (
                      <FieldLabel htmlFor={field.name}>
                        {field.label}
                      </FieldLabel>
                    ) : null}
                    {renderFieldControl(field)}
                    {field?.description ? (
                      <FieldDescription>{field?.description}</FieldDescription>
                    ) : null}
                    {errors[field?.name] ? (
                      <FieldError>{errors[field?.name].message}</FieldError>
                    ) : null}
                  </Field>
                ))}
              </FieldSet>
            </FieldGroup>
            <Field orientation="horizontal" className="mt-5">
              <Button type="submit">Submit</Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonForm;
