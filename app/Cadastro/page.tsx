"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "@/components/Logo";

import AuthCard from "@/components/AuthCard";
import InfoAlert from "@/components/InfoAlert";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { registerUser } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CadastroPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/Inicio";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) return setError("Informe seu nome completo.");
    if (!email.trim()) return setError("Informe um e-mail válido.");
    if (password.length < 6)
      return setError("A senha deve ter pelo menos 6 caracteres.");
    if (password !== confirm) return setError("As senhas não conferem.");
    if (!accepted)
      return setError(
        "É necessário aceitar os Termos de Uso e a Política de Privacidade."
      );

    setSubmitting(true);
    try {
      await registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      router.push(next);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível criar sua conta.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
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
          title="Criar sua conta"
          subtitle="Comece a gerenciar suas finanças hoje"
          footer={
            <>
              Já tem uma conta?{" "}
              <Link
                href="/Login"
                className="font-medium text-blue-600 hover:underline"
              >
                Fazer login
              </Link>
            </>
          }
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              label="Nome completo"
              placeholder="Seu nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              autoComplete="name"
              required
            />

            <FormField
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />

            <FormField
              label="Senha"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <FormField
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Aceito os{" "}
                <Link href="#" className="underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="#" className="underline">
                  Política de Privacidade
                </Link>
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Criando conta..." : "Criar Conta"}
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
