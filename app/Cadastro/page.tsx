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
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cadastroSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Informe seu nome completo")
      .min(8, "Informe seu nome completo."),
    email: z
      .string()
      .trim()
      .min(1, "Informe um e-mail válido.")
      .email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirm: z.string().min(1, "Confirme sua senha."),
    accepted: z.boolean().refine((v) => v === true),
  })

  .refine((data) => data.password === data.confirm, {
    message: "As senhas devem ser iguais.",
    path: ["confirm"],
  });

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function CadastroPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/Inicio";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirm: "",
      accepted: false,
    },
  });

  const onSubmit = async (data: CadastroForm) => {
    setServerError(null);

    try {
      await registerUser({
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      router.push(next);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Não foi possível criar sua conta";
      setServerError(message);
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Nome completo"
              placeholder="Seu nome completo"
              type="text"
              autoComplete="name"
              required
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            <FormField
              label="E-mail"
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />

            <FormField
              label="Senha"
              placeholder="Crie uma senha segura"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              error={errors.password?.message}
              {...register("password")}
            />

            <FormField
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              error={errors.confirm?.message}
              {...register("confirm")}
            />

            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1"
                {...register("accepted")}
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
              {isSubmitting ? "Criando conta..." : "Criar Conta"}
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
