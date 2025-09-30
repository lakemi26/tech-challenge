"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "@/components/Logo";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import AuthCard from "@/components/AuthCard";
import InfoAlert from "@/components/InfoAlert";
import { authErrorMessage, loginUser } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/Inicio";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Informe um e-mail válido");
    if (!password) return setError("Informe sua senha.");

    setSubmitting(true);
    try {
      await loginUser({ email: email.trim(), password });
      router.push(next);
    } catch (err: unknown) {
      setError(authErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-8">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <FiArrowLeft className="shrink-0" />
          Voltar ao início
        </Link>
      </header>

      <main className="mx-auto w-full max-w-md px-4">
        <AuthCard
          title="Entrar na sua conta"
          subtitle="Acesse seu painel financeiro"
          footer={
            <>
              Não tem uma conta?{" "}
              <Link
                href="/Cadastro"
                className="font-medium text-blue-600 hover:underline"
              >
                Criar conta
              </Link>
            </>
          }
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              label="E-mail"
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-2">
              <FormField
                label="Senha"
                placeholder="Sua senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right">
                <Link
                  href="/ResetSenha"
                  className="text-sm font-semibold text-slate-600 underline hover:text-slate-800"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </AuthCard>

        <InfoAlert title="Seus dados estão seguros" className="mt-6">
          Usamos criptografia de ponta para proteger suas informações pessoais e
          financeiras.
        </InfoAlert>
      </main>
    </div>
  );
}
