"use client";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CadastroPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Informe seu nome completo.");
      return;
    }
    if (!email.trim()) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Não foi possível criar sua conta";
      setError(message);
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
        <span className="text-gray-700 font-medium">Cadastro</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Crie sua conta</h1>
        <p className="text-gray-600">
          Gerencie suas finanças com simplicidade.
        </p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <form onSubmit={onSubmit} className="md:col-span-2 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                autoComplete="name"
                required
              />
              <FormField
                label="Email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <FormField
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="password"
              minLength={6}
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                Já tem conta?{" "}
                <a href="/Login" className="underline">
                  Entrar
                </a>
              </p>

              <Button
                type="submit"
                variant="primary"
                className="min-w-[9erm]"
                disabled={submitting}
              >
                {submitting ? "Criando conta..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
