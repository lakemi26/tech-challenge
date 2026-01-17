"use client";

import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetFilters,
  setCategory,
  setPeriod,
  setSearch,
  setType,
} from "@/store/filtersSlice";
import type {
  TransactionCategory,
  TransactionType,
} from "@/services/transactions";

type FilterType = TransactionType | "all";
type FilterCategory = TransactionCategory | "all";

const TYPE_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "Todos os tipos" },
  { value: "deposito", label: "Depósito" },
  { value: "saque", label: "Saque" },
  { value: "transferencia", label: "Transferência" },
];

const CATEGORY_OPTIONS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Todas as categorias" },
  { value: "salario", label: "Salário" },
  { value: "moradia", label: "Moradia" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "saude", label: "Saúde" },
  { value: "investimento", label: "Investimento" },
  { value: "utilidades", label: "Utilidades" },
];

function monthLabel(m: number) {
  const labels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return labels[m - 1] ?? String(m);
}

export default function TransactionsFilters() {
  const dispatch = useAppDispatch();
  const { period, type, category, search } = useAppSelector((s) => s.filters);

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return { value: String(m), label: monthLabel(m) };
  });

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { value: String(y), label: String(y) };
  });

  return (
    <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 mt-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <FormField
          as="select"
          label="Mês"
          value={String(period.month)}
          onChange={(e) =>
            dispatch(
              setPeriod({
                year: period.year,
                month: Number(e.target.value),
              })
            )
          }
          options={monthOptions}
        />

        <FormField
          as="select"
          label="Ano"
          value={String(period.year)}
          onChange={(e) =>
            dispatch(
              setPeriod({
                year: Number(e.target.value),
                month: period.month,
              })
            )
          }
          options={yearOptions}
        />

        <FormField
          as="select"
          label="Tipo"
          value={type}
          onChange={(e) => dispatch(setType(e.target.value as FilterType))}
          options={TYPE_OPTIONS}
        />

        <FormField
          as="select"
          label="Categoria"
          value={category}
          onChange={(e) =>
            dispatch(setCategory(e.target.value as FilterCategory))
          }
          options={CATEGORY_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="md:col-span-4">
          <FormField
            label="Buscar"
            placeholder="Ex: mercado, aluguel, salário..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => dispatch(resetFilters())}
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
