import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";
import Text from "@/components/Text";
import { colors } from "@/utils/tokens";
import { Button } from "@/components";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finanças",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex max-sm:flex-row items-center justify-between px-2 min-md:px-16 max-sm:px-4 py-8 w-full">
          <Logo />

          <div className="flex items-center gap-4  max-sm:gap-2">
            <Link href="/Login">
              <Button variant="secondary">Entrar</Button>
            </Link>
            <Link href="/Cadastro">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </header>

        {children}

        <footer
          className="flex min-md:justify-between max-sm:justify-center max-sm:flex-col items-center max-sm:gap-4 p-8 min-h-[20vh] w-full"
          style={{ backgroundColor: colors.background.darkBlue }}
        >
          <Logo className="text-white" textColor="white" />
          <Text color="tertiary">
            © 2025 FinanceApp. Todos os direitos reservados.
          </Text>
        </footer>
      </body>
    </html>
  );
}
