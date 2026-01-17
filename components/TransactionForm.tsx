"use client";

import {
  addTransaction,
  Transaction,
  TransactionCategory,
  TransactionType,
  updateTransaction,
} from "@/services/transactions";
import { useEffect, useMemo, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";

import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/services/firebase";

type Props = {
  initial?: Transaction | null;
  onSaved?: (saved: Transaction) => void;
  onCancel?: () => void;
};

const TYPE_OPTIONS: { value: TransactionType; label: string }[] = [
  { value: "deposito", label: "Depósito" },
  { value: "saque", label: "Saque" },
  { value: "transferencia", label: "Transferência" },
];

const CATEGORY_OPTIONS: { value: TransactionCategory; label: string }[] = [
  { value: "salario", label: "Salário" },
  { value: "moradia", label: "Moradia" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "saude", label: "Saúde" },
  { value: "investimento", label: "Investimento" },
  { value: "utilidades", label: "Utilidades" },
];

const nfBRL = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function maskBRLFromDigits(digitsOnly: string) {
  const n = parseInt(digitsOnly || "0", 10);
  const val = n / 100;
  return nfBRL.format(val);
}

function parseBRLToNumber(masked: string) {
  const normalized = masked.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

function getTodayLocalISODate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseISODateToLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

const DESCRIPTION_MAX = 140;

const TYPE_VALUES = ["deposito", "saque", "transferencia"] as const;
const CATEGORY_VALUES = [
  "salario",
  "moradia",
  "alimentacao",
  "saude",
  "investimento",
  "utilidades",
] as const;

const transactionSchema = z
  .object({
    type: z.enum(TYPE_VALUES, { message: "Selecione o tipo de transação." }),
    category: z.enum(CATEGORY_VALUES, { message: "Selecione uma categoria." }),

    valueMasked: z
      .string()
      .min(1, "Informe um valor.")
      .refine((v) => {
        const value = parseBRLToNumber(v);
        return Number.isFinite(value) && value > 0;
      }, "Informe um valor válido maior que zero."),

    description: z
      .string()
      .max(DESCRIPTION_MAX, `Descrição muito longa (máx. ${DESCRIPTION_MAX}).`)
      .optional(),

    dateStr: z
      .string()
      .min(1, "Informe a data.")
      .refine(
        (s) => !Number.isNaN(parseISODateToLocalDate(s).getTime()),
        "Data inválida."
      )
      .refine(
        (s) => s <= getTodayLocalISODate(),
        "A data não pode ser futura."
      ),
  })
  .superRefine((data, ctx) => {
    if (data.type === "saque" && data.category === "salario") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Saque não pode ser categorizado como Salário.",
        path: ["category"],
      });
    }
  });

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm({ initial, onSaved, onCancel }: Props) {
  const isEdit = !!initial;

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onSubmit",
    defaultValues: {
      type: "deposito",
      category: "salario",
      description: "",
      dateStr: getTodayLocalISODate(),
      valueMasked: "0,00",
    },
  });

  const watchedType = useWatch({ control, name: "type" });
  const watchedCategory = useWatch({ control, name: "category" });
  const watchedDescription = useWatch({ control, name: "description" });
  const watchedValueMasked = useWatch({ control, name: "valueMasked" });

  const valueSign =
    watchedType === "saque" ? "-" : watchedType === "deposito" ? "+" : "±";

  const valueBadge = (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
        watchedType === "saque"
          ? "bg-red-100 text-red-700"
          : watchedType === "deposito"
          ? "bg-green-100 text-green-700"
          : "bg-slate-100 text-slate-700"
      }`}
      aria-hidden="true"
    >
      {valueSign}
    </span>
  );

  const valueHelper =
    watchedType === "saque"
      ? "Para saque, o valor será registrado como negativo."
      : watchedType === "transferencia"
      ? "Transferência também conta como saída."
      : undefined;

  useEffect(() => {
    if (initial) {
      const absMasked = nfBRL.format(Math.abs(initial.value));

      const localISO = (() => {
        const d = initial.date;
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      })();

      reset({
        type: initial.type,
        category: initial.category,
        description: initial.description || "",
        dateStr: localISO,
        valueMasked: absMasked,
      });
      setServerError(null);
    } else {
      reset({
        type: "deposito",
        category: "salario",
        description: "",
        dateStr: getTodayLocalISODate(),
        valueMasked: "0,00",
      });
      setServerError(null);
    }
  }, [initial, reset]);

  useEffect(() => {
    if (watchedType === "saque" && watchedCategory === "salario") {
      setValue("category", "moradia", { shouldValidate: true });
    }
  }, [watchedType, watchedCategory, setValue]);

  const heading = useMemo(
    () => (isEdit ? "Editar Transação" : "Nova Transação"),
    [isEdit]
  );

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    const masked = maskBRLFromDigits(digits);
    setValue("valueMasked", masked, { shouldValidate: true });
  }

  const onSubmit = async (data: TransactionFormData) => {
    setServerError(null);

    try {
      const parsed = parseBRLToNumber(data.valueMasked);

      const value =
        data.type === "deposito" ? Math.abs(parsed) : -Math.abs(parsed);

      const payload = {
        type: data.type,
        category: data.category,
        description: data.description || "",
        value,
        date: parseISODateToLocalDate(data.dateStr),
      };

      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("Usuário não autenticado.");

      if (isEdit && initial) {
        await updateTransaction(initial.id, payload);

        onSaved?.({
          ...initial,
          ...payload,
          uid,
        });
      } else {
        const id = await addTransaction(payload);

        onSaved?.({
          id,
          uid,
          type: payload.type,
          category: payload.category,
          description: payload.description,
          value: payload.value,
          date: payload.date,
          createdAt: new Date(),
        });
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível salvar a transação.";
      setServerError(message);
    }
  };

  const descLen = (watchedDescription ?? "").length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="sr-only">{heading}</h3>

      <div className="grid gap-4">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <FormField
              as="select"
              label="Tipo de transação"
              options={TYPE_OPTIONS}
              error={errors.type?.message}
              value={field.value}
              onChange={(e) =>
                field.onChange(e.target.value as TransactionType)
              }
            />
          )}
        />

        <FormField
          label="Valor (R$)"
          placeholder="0,00"
          inputMode="numeric"
          error={errors.valueMasked?.message}
          helperText={valueHelper}
          startAdornment={valueBadge}
          {...register("valueMasked")}
          onChange={onChangeValue}
          value={watchedValueMasked ?? ""}
        />

        <FormField
          as="textarea"
          label="Descrição"
          placeholder="Descreva a transação..."
          error={errors.description?.message}
          helperText={`${descLen}/${DESCRIPTION_MAX}`}
          {...register("description")}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <FormField
              as="select"
              label="Categoria"
              options={CATEGORY_OPTIONS}
              error={errors.category?.message}
              value={field.value}
              onChange={(e) =>
                field.onChange(e.target.value as TransactionCategory)
              }
            />
          )}
        />

        <FormField
          label="Data"
          type="date"
          error={errors.dateStr?.message}
          max={getTodayLocalISODate()}
          {...register("dateStr")}
        />
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? isEdit
              ? "Atualizando..."
              : "Adicionando ..."
            : isEdit
            ? "Atualizar"
            : "Adicionar"}
        </Button>
      </div>
    </form>
  );
}
