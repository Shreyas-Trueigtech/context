import { useMemo } from "react";
import { useForm } from "react-hook-form";

const makeDefaultValues = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field?.name] = field?.defaultValue ?? "";
    return acc;
  }, {});
};

export const useLoginForm = ({ fields, onSubmitUser }) => {
  const defaultValues = useMemo(() => makeDefaultValues(fields), [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    onSubmitUser(data);
  });

  return {
    register,
    errors,
    onSubmit,
  };
};
