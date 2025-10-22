"use client";

import { BiHome, BiLogOut, BiTrendingUp } from "react-icons/bi";
import Button from "./Button";
import { logoutUser } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

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
    <header className="bg-white border-b border-border border-gray-200 shadow-sm">
      <div className="p-12 py-2">
        <div className="flex justify-between items-center ">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BiTrendingUp className="w-5 h-5 text-white" />
          </div>

          <nav className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  className={`
                  relative flex items-center gap-1 px-4 py-2 -mb-px font-medium transition-colors
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

          <Button variant="secondary" onClick={handleLogout}>
            <BiLogOut />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
