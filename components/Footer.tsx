"use client";

import Logo from "@/components/Logo";
import Text from "@/components/Text";
import { colors } from "@/utils/tokens";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname() ?? "";
  const hide = path.startsWith("/");

  if (hide) return null;

  return (
    <footer
      className="flex min-md:justify-between max-sm:justify-center max-sm:flex-col items-center max-sm:gap-4 p-8 min-h-[20vh] w-full"
      style={{ backgroundColor: colors.background.darkBlue }}
    >
      <Logo className="text-white" textColor="white" />
      <Text color="tertiary">
        © 2025 FinanceApp. Todos os direitos reservados.
      </Text>
    </footer>
  );
}
