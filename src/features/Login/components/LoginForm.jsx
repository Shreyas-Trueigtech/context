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
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Input
                      id={field.name}
                      type={field.type}
                      aria-invalid={!!errors[field.name]}
                      {...register(field.name, field.rules)}
                    />
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
