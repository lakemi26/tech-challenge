"use client";

import {
  addTransaction,
  Transaction,
  TransactionCategory,
  TransactionType,
  updateTransaction,
} from "@/services/transactions";
import { FormEvent, useEffect, useMemo, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";

type Props = {
  initial?: Transaction | null;
  onSaved?: () => void;
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

export default function TransactionForm({ initial, onSaved, onCancel }: Props) {
  const isEdit = !!initial;

  const [type, setType] = useState<TransactionType | "">("");
  const [category, setCategory] = useState<TransactionCategory | "">("");
  const [description, setDescription] = useState("");
  const [dateStr, setDateStr] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );

  const [valueMasked, setValueMasked] = useState("0,00");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setType(initial.type);
      setCategory(initial.category);
      setDescription(initial.description || "");
      setDateStr(initial.date.toISOString().slice(0, 10));
      setValueMasked(nfBRL.format(initial.value));
    } else {
      resetForm();
    }
  }, [initial]);

  const heading = useMemo(
    () => (isEdit ? "Editar Transação" : "Nova Transação"),
    [isEdit]
  );

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setValueMasked(maskBRLFromDigits(digits));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!type) {
      setError("Selecione o tipo de transação.");
      return;
    }
    if (!category) {
      setError("Selecione uma categoria.");
      return;
    }

    const value = parseBRLToNumber(valueMasked);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Informe um valor válido maior que zero.");
      return;
    }

    setSubmitting(true);
    try {
      const typeSafe = type as TransactionType;
      const categorySafe = category as TransactionCategory;

      if (isEdit && initial) {
        await updateTransaction(initial.id, {
          type,
          category,
          description,
          value,
          date: new Date(dateStr),
        });
      } else {
        await addTransaction({
          type,
          category,
          description,
          value,
          date: new Date(dateStr),
        });
      }
      onSaved?.();
    } catch (err: any) {
      setError(err?.message ?? "Não foi possível salvar a transação.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setType("");
    setCategory("");
    setDescription("");
    setDateStr(new Date().toISOString().slice(0, 10));
    setValueMasked("0,00");
    setError(null);
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h3 className="sr-only">{heading}</h3>

      <div className="grid gap-4">
        <FormField
          as="select"
          label="Tipo de transação"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          options={[
            { value: "", label: "Selecione o tipo" } as any,
            ...TYPE_OPTIONS,
          ]}
        />

        <FormField
          label="Valor (R$)"
          placeholder="0,00"
          value={valueMasked}
          onChange={onChangeValue}
          inputMode="numeric"
        />

        <FormField
          as="textarea"
          label="Descrição"
          placeholder="Descreva a transação..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormField
          as="select"
          label="Categoria"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as TransactionCategory | "")
          }
          options={[
            { value: "", label: "Selecione uma categoria" } as any,
            ...CATEGORY_OPTIONS,
          ]}
        />

        <FormField
          label="Data"
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting
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
