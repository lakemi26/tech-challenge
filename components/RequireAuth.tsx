"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthUser();

  useEffect(() => {
    if (user === null) {
      router.replace(`/Login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, router, pathname]);

  if (user === undefined) {
    return <div>Carregando…</div>;
  }
  if (user === null) {
    return null;
  }

  return <>{children}</>;
}
