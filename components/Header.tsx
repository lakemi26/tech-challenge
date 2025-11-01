"use client";

import { BiHome, BiLogOut, BiTrendingUp } from "react-icons/bi";
import Button from "./Button";
import { logoutUser } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import Logo from "./Logo";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthUser();

  const path = usePathname() ?? "";
  const hide = path.startsWith("/Login") || path.startsWith("/Cadastro");

  if (hide) return null;

  async function handleLogout() {
    try {
      await logoutUser();
      router.push("/Login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  const tabs = [
    { key: "Inicio", label: "Início", icon: BiHome, href: "/Inicio" },
    {
      key: "Transacoes",
      label: "Transações",
      icon: BiTrendingUp,
      href: "/Transacoes",
    },
  ];
  const activeTab =
    tabs.find((tab) => pathname.startsWith(tab.href))?.key || "inicio";

  return (
    <header className="flex max-sm:flex-row items-center justify-between min-md:px-16 max-sm:px-4 py-8 w-full">
      <div className="flex justify-between items-center ">
        <Logo showText={!user} />

        {user && (
          <nav className="flex border-b border-gray-200 ml-8 max-sm:ml-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  className={`
                  relative flex items-center gap-1 max-sm:px-2 px-4 py-2 -mb-px font-medium transition-colors max-sm:text-xs
                  ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
                  onClick={() => router.push(tab.href)}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {user ? (
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="max-sm:text-xs"
        >
          <BiLogOut />
          Sair
        </Button>
      ) : (
        <div className="flex items-center gap-4 max-sm:gap-2">
          <Link href="/Login">
            <Button variant="secondary">Entrar</Button>
          </Link>
          <Link href="/Cadastro">
            <Button>Criar Conta</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
