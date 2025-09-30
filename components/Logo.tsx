"use client";

import { FiTrendingUp } from "react-icons/fi";

type Props = {
  showText?: boolean;
  name?: string;
  href?: string;
  className?: string;
  iconSize?: number;
};

export default function Logo({
  showText = true,
  name = "FinanceApp",
  href = "/",
  className = "",
  iconSize = 18,
}: Props) {
  return (
    <a
      href={href}
      aria-label={name}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
        <FiTrendingUp size={iconSize} className="text-white" />
      </span>

      {showText && (
        <span className="text-xl font-semibold text-slate-900">{name}</span>
      )}
    </a>
  );
}
