"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";

type Props = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export default function InfoAlert({ title, children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 ${className}`}
    >
      <div className="flex items-start gap-3">
        <FiCheckCircle className="mt-0.5" />
        <div>
          <p className="font-medium">{title}</p>
          {children && <p>{children}</p>}
        </div>
      </div>
    </div>
  );
}
