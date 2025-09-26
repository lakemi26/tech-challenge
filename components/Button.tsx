"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none";

  const variants: Record<typeof variant, string> = {
    primary: "bg-black text-white hover:bg-black/90",
    secondary:
      "border border-gray-300 bg-transparent text-black hover:bg-gray-50",
    ghost: "p-2 border border-gray-300 text-black hover:bg-gray-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
