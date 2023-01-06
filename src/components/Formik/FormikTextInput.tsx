import React from "react";

import { Field, useFormikContext } from "formik";

export type FormikTextInputType = "text" | "password" | "email" | "number";

type FormikTextInputProps<T> = {
  name: keyof T;
  label?: string;
  type?: FormikTextInputType;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
};

export default function FormikTextInput<T>({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  className,
  inputClassName,
}: FormikTextInputProps<T>) {
  const { errors } = useFormikContext<T>();

  const fieldError = errors[name];

  return (
    <div className={`flex flex-col relative gap-1 transition-all ${className}`}>
      {label && (
        <label htmlFor={name as string} className="font-semibold">
          {label}
        </label>
      )}
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`outline-none border rounded-lg py-2 px-3 ${inputClassName} ${fieldError ? "border-red-500" : ""}`}
      />
      {fieldError && <div className="text-red-500 text-sm absolute -bottom-5 right-0 ">{fieldError.toString()}</div>}
    </div>
  );
}
