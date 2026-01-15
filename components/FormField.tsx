"use client";

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useId,
} from "react";

type BaseProps = {
  label: string;
  error?: string | null;
  helperText?: string;
  variant?: "surface" | "subtle";
  id?: string;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextAreaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string }[];
  };

type FormFieldProps = InputProps | TextAreaProps | SelectProps;

export default function FormField(props: FormFieldProps) {
  const {
    label,
    error,
    helperText,
    as = "input",
    variant = "surface",
    id,
    startAdornment,
    endAdornment,
    className: classNameProp,
    ...rest
  } = props;

  const reactId = useId();
  const fieldId = id ?? `field-${reactId}`;
  const messageId = `${fieldId}-message`;

  const base =
    "w-full rounded-md px-3 py-2 text-sm outline-none transition focus:ring-2";

  const variantClasses =
    variant === "subtle"
      ? "bg-transparent border border-slate-200"
      : "bg-gray-100 border border-transparent";

  const stateClasses = error
    ? "border-red-500 focus:ring-red-500/30"
    : "focus:ring-black/50";

  const padLeft = startAdornment ? "pl-10" : "";
  const padRight = endAdornment ? "pr-10" : "";

  const className = [
    base,
    variantClasses,
    stateClasses,
    padLeft,
    padRight,
    classNameProp,
  ]
    .filter(Boolean)
    .join(" ");

  const ariaInvalid = Boolean(error) ? true : undefined;
  const ariaDescribedBy = error || helperText ? messageId : undefined;

  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="block text-sm font-bold">
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={fieldId}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={className}
          {...(rest as TextAreaProps)}
        />
      ) : as === "select" ? (
        <select
          id={fieldId}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={className}
          {...(rest as SelectProps)}
        >
          {(rest as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {startAdornment && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {startAdornment}
            </div>
          )}

          <input
            id={fieldId}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            className={className}
            {...(rest as InputProps)}
          />

          {endAdornment && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {endAdornment}
            </div>
          )}
        </div>
      )}

      {(error || helperText) && (
        <p
          id={messageId}
          className={`text-xs ${error ? "text-red-600" : "text-slate-500"}`}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
