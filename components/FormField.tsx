"use client";

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type BaseProps = {
  label: string;
  error?: string | null;
  variant?: "surface" | "subtle";
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

export default function FormField({
  label,
  error,
  as = "input",
  ...props
}: FormFieldProps) {
  const sharedClasses =
    "w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/50";

  return (
    <div className="space-y-1">
      <label className="block text-sm font-bold">{label}</label>

      {as === "textarea" ? (
        <textarea className={sharedClasses} {...(props as TextAreaProps)} />
      ) : as === "select" ? (
        <select className={sharedClasses} {...(props as SelectProps)}>
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input className={sharedClasses} {...(props as InputProps)} />
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
