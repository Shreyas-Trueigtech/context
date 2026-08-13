import { useMemo } from "react";
import { useForm } from "react-hook-form";

const makeDefaultValues = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field?.name] = field?.defaultValue ?? "";
    return acc;
  }, {});
};

export const useLoginForm = ({ fields, onSubmitUser, initialValues = {} }) => {
  const defaultValues = useMemo(
    () => ({
      ...makeDefaultValues(fields),
      ...initialValues,
    }),
    [fields, initialValues],
  );

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
