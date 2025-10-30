"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm max-sm:text-xs font-medium transition-colors focus:outline-none cursor-pointer";

  const variants: Record<typeof variant, string> = {
    primary: "bg-black font-bold text-white hover:bg-black/90 hover:text-white",
    secondary:
      "border border-gray-300 bg-transparent text-black hover:bg-gray-50 hover:text-black",
    ghost:
      "p-2 border border-gray-300 text-black hover:bg-gray-50 hover:text-white",
  };

  return (
    <button
      className={cn(`${base} ${variants[variant]} ${className ?? ""}`)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
