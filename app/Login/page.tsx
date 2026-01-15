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
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido"),
  password: z.string().min(1, "Informe sua senha.").min(6, "Senha inválida."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/Inicio";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: LoginForm) {
    setServerError(null);

    try {
      await loginUser({ email: data.email, password: data.password });
      router.push(next);
    } catch (err: unknown) {
      setServerError(authErrorMessage(err));
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white py-16">
      <header className="mx-auto y-16 flex max-w-md flex-col items-center gap-3 px-4 py-8">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="E-mail"
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
              required
            />

            <div className="space-y-2">
              <FormField
                label="Senha"
                placeholder="Sua senha"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
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

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
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
