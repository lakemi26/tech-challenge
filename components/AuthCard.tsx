"use client";

import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className = "",
}: Props) {
  return (
    <section
      className={`rounded-2xl bg-white p-6 shadow-lg shadow-gray-500/50 sm:p-8 ${className}`}
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
      </div>

      {children}

      {footer && (
        <div className="mt-6 border-t pt-4 text-center text-sm text-slate-600">
          {footer}
        </div>
      )}
    </section>
  );
}
