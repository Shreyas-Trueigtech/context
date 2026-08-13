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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = ({ fields, register, errors, onSubmit, theme, toggleTheme }) => {
  const renderFieldControl = (field) => {
    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          placeholder={field.placeholder}
          aria-invalid={!!errors[field.name]}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register(field.name, field.rules)}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          id={field.name}
          aria-invalid={!!errors[field.name]}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register(field.name, field.rules)}
        >
          <option value="">{field.placeholder ?? "Select an option"}</option>
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "radio") {
      return (
        <div className="flex gap-4">
          {(field.options ?? []).map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={option.value}
                {...register(field.name, field.rules)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="flex items-center gap-2 text-sm">
          <input
            id={field.name}
            type="checkbox"
            aria-invalid={!!errors[field.name]}
            {...register(field.name, field.rules)}
          />
          <span>{field.label}</span>
        </label>
      );
    }

    return (
      <Input
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        aria-invalid={!!errors[field.name]}
        {...register(field.name, field.rules)}
      />
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your information below to create your account
              </CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"} mode
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <FieldSet>
                {fields.map((field) => (
                  <Field key={field.name} data-invalid={!!errors[field.name]}>
                    {field.type === "checkbox" ? null : (
                      <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    )}
                    {renderFieldControl(field)}
                    {field.description ? (
                      <FieldDescription>{field.description}</FieldDescription>
                    ) : null}
                    {errors[field.name] ? (
                      <FieldError>{errors[field.name].message}</FieldError>
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

export default LoginForm;
