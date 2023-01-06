import React from "react";

import { useFormikContext } from "formik";

type FormikRadioGroupType = "rating";

type FormikRadioGroupProps<T> = {
  name: keyof T;
  label?: string;
  type?: FormikRadioGroupType;
  attributes: { [key: string]: string | number } | null;
  disabled?: boolean;
  className?: string;
  radioButtonClassName?: string;
};

export default function FormikRadioGroup<T>({
  name,
  label,
  type = "rating",
  attributes,
  disabled = false,
  className,
  radioButtonClassName,
}: FormikRadioGroupProps<T>) {
  const { errors, values, setFieldValue } = useFormikContext<T>();

  const fieldError = errors[name];
  const value = values[name];

  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <label htmlFor={name as string} className="font-semibold text-sm">
          {label}
        </label>
      )}
      {type === "rating" && (
        <RatingButtons
          name={name}
          value={value}
          setFieldValue={setFieldValue}
          className={radioButtonClassName}
          disabled={disabled}
          min={attributes?.min as number}
          max={attributes?.max as number}
        />
      )}
      {fieldError && <div className="text-red-500 text-sm absolute -bottom-5 right-0">{fieldError.toString()}</div>}
    </div>
  );
}

type RatingButtonsProps<T> = {
  name: keyof T;
  value: unknown;
  setFieldValue: (field: string, value: unknown) => void;
  className?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

function RatingButtons<T>({
  name,
  value,
  setFieldValue,
  className,
  min = 1,
  max = 5,
  disabled = false,
}: RatingButtonsProps<T>) {
  const ratings = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className={`flex flex-row justify-evenly w-full text-center gap-2 ${className}`}>
      {ratings.map((rating) => (
        <div
          key={rating}
          onClick={() => {
            if (!disabled) setFieldValue(name as string, rating);
          }}
          className="w-full cursor-pointer"
        >
          <input type="radio" name={name as string} value={rating} disabled={disabled} className="hidden" />
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl">{rating}</div>
            <div className="text-xs">stars</div>
            {value === rating && <div className="text-xs">selected</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
