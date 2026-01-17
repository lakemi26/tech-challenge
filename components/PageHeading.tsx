"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
  title: string;
  subtitle?: string;
  name?: string;
  useNameFromAuth?: boolean;
  className?: string;
};

function getFirstName(full?: string | null): string {
  if (!full) return "";
  const token = full.trim().split(/\s+/)[0];
  return token.charAt(0).toUpperCase() + token.slice(1);
}

function nameFromEmail(email?: string | null): string {
  if (!email) return "";
  const raw = email.split("@")[0];
  return getFirstName(raw.replace(/[\._-]+/g, " "));
}

export default function PageHeading({
  title,
  subtitle,
  name,
  useNameFromAuth = true,
}: Props) {
  const [autoName, setAutoName] = useState<string>("");

  useEffect(() => {
    if (!useNameFromAuth) return;
    const off = onAuthStateChanged(auth, (u) => {
      const display = u?.displayName || nameFromEmail(u?.email);
      setAutoName(getFirstName(display));
    });
    return off;
  }, [useNameFromAuth]);

  const firstName = useMemo(
    () => getFirstName(name ?? autoName),
    [name, autoName]
  );

  const resolvedTitle = useMemo(() => {
    if (!title.includes("{name")) return title;
    if (firstName) return title.replace("{name}", firstName);
    return title.replace(", {name}", "").replace("{name}", "");
  }, [title, firstName]);

  return (
    <div className="{`space-y-1 ${className ??}`}">
      <h1 className="text-3xl font-extrabold leading-tight text-slate-900">
        {resolvedTitle}
      </h1>
      {subtitle && (
        <p className="text-base text-slate-500 font-bold">{subtitle}</p>
      )}
    </div>
  );
}
