"use client";

import Link from "next/link";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Logo from "@/components/Logo";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { authErrorMessage, loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Informe um e-mail válido");
      return;
    }
    if (!password) {
      setError("Informe sua senha.");
      return;
    }

    setSubmitting(true);
    try {
      await loginUser({ email: email.trim(), password });
      router.push("/Inicio");
    } catch (err: unknown) {
      setError(authErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white md:py-15">
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
        <section className="rounded-2xl bg-white p-6 shadow-lg shadow-gray-500/50  sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Entrar na sua conta
            </h1>
            <p className="mt-1 text-slate-500">Acesse seu painel financeiro</p>
          </div>

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
                  className="text-sm font-bold text-slate-600 underline hover:text-slate-800"
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

            <div className="border-t pt-4 text-center text-sm text-slate-600">
              Não tem uma conta?{" "}
              <Link
                href="/Cadastro"
                className="font-bold text-blue-600 hover:underline"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </section>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <div className="flex items-start gap-3">
            <FiCheckCircle className="mt-0.5" />
            <div>
              <p className="font-medium">Seus dados estão seguros</p>
              <p>
                Usamos criptografia de ponta para proteger suas informações
                pessoais e financeiras.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
