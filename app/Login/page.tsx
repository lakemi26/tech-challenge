"use client";

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
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700">
          Início
        </a>
        <span>›</span>
        <span className="text-gray-700 font-medium">Login</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Acesse sua conta</h1>
        <p className="text-gray-600">
          Gerencie suas finanças com simplicidade.
        </p>
      </div>

      <section className="rounded-2xl max-w-[400px] border bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          <FormField
            label="Email"
            placeholder="seu@email.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormField
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Não tem conta?{" "}
                <a href="/Cadastro" className="underline">
                  Criar conta
                </a>
              </p>
              <a href="/ResetSenha" className="text-sm underline">
                Esqueci minha senha
              </a>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="min-w-[9rem]"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
