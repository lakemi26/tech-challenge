"use client";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { authErrorMessage, resetPassword } from "@/services/auth";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ResetSenhaPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim()) {
      setError("Informe um e-mail válido.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (err: unknown) {
      setError(authErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Início
        </Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Reset de senha</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Redefinir senha</h1>
        <p className="text-gray-600">
          Enviaremos um link de redefinição de senha para o seu email
        </p>
      </div>

      <section className="max-w-100 rounded-2xl border bg-white p-6 shadow-sm">
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

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-emerald-600">
              Enviamos as instruções para o seu email. Verifique a caixa de
              entrada e o spam.
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <Link href="/Login" className="text-sm underline">
              Voltar ao login
            </Link>

            <Button type="submit" disabled={submitting} aria-busy={submitting}>
              {submitting ? "Enviando..." : "Enviar Link"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
