"use client";

import { useMemo } from "react";
import type { Transaction, TransactionCategory } from "@/services/transactions";

type Props = {
  transactions: Transaction[];
};

const nfBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function categoryLabel(c: TransactionCategory) {
  const map: Record<TransactionCategory, string> = {
    salario: "Salário",
    moradia: "Moradia",
    alimentacao: "Alimentação",
    saude: "Saúde",
    investimento: "Investimento",
    utilidades: "Utilidades",
  };
  return map[c] ?? c;
}

export default function FinancialInsights({ transactions }: Props) {
  const insights = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "deposito")
      .reduce((s, t) => s + Math.abs(t.value), 0);

    const expenses = transactions
      .filter((t) => t.type !== "deposito")
      .reduce((s, t) => s + Math.abs(t.value), 0);

    const balance = transactions.reduce((s, t) => s + t.value, 0);

    const txCount = transactions.length;
    const outflowCount = transactions.filter(
      (t) => t.type !== "deposito"
    ).length;

    const byCategory = new Map<TransactionCategory, number>();
    for (const t of transactions) {
      if (t.type === "deposito") continue;
      byCategory.set(
        t.category,
        (byCategory.get(t.category) ?? 0) + Math.abs(t.value)
      );
    }

    const topCategory = Array.from(byCategory.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const byDayOutflow = new Map<string, number>();
    for (const t of transactions) {
      if (t.type === "deposito") continue;

      const d = t.date;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;

      byDayOutflow.set(key, (byDayOutflow.get(key) ?? 0) + Math.abs(t.value));
    }

    const topDay = Array.from(byDayOutflow.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const savingsRate =
      income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

    return {
      income,
      expenses,
      balance,
      txCount,
      outflowCount,
      topCategory: topCategory
        ? {
            category: topCategory[0],
            amount: topCategory[1],
            share: pct(topCategory[1], expenses),
          }
        : null,
      topDay: topDay
        ? {
            dayKey: topDay[0],
            amount: topDay[1],
            share: pct(topDay[1], expenses),
          }
        : null,
      savingsRate,
    };
  }, [transactions]);

  const monthLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }, []);

  if (transactions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Ainda não há transações em{" "}
        <span className="font-semibold">{monthLabel}</span>. Assim que você
        registrar entradas e saídas, eu mostro um resumo do mês e os principais
        destaques.
      </p>
    );
  }

  const {
    income,
    expenses,
    balance,
    txCount,
    outflowCount,
    topCategory,
    topDay,
    savingsRate,
  } = insights;

  const status =
    balance > 0 ? "positivo" : balance < 0 ? "em débito" : "zerado";

  const statusClass =
    balance > 0
      ? "text-emerald-700"
      : balance < 0
      ? "text-rose-700"
      : "text-slate-700";

  const dayLabel = (dayKey: string) => {
    const [, mm, dd] = dayKey.split("-");
    return `${dd}/${mm}`;
  };

  const summaryText = `Em ${monthLabel}, você registrou ${txCount} ${
    txCount === 1 ? "transação" : "transações"
  }, sendo ${outflowCount} ${
    outflowCount === 1 ? "saída" : "saídas"
  }. O saldo do mês está ${status}.`;

  const interpretationText =
    income > 0
      ? `Até agora, suas entradas somam ${nfBRL.format(
          income
        )} e suas saídas somam ${nfBRL.format(
          expenses
        )}. Isso dá uma taxa estimada de “sobra” de ${Math.max(
          0,
          savingsRate
        )}% .`
      : `Até agora, suas saídas somam ${nfBRL.format(
          expenses
        )}. Assim que houver entradas registradas, eu calculo também sua taxa de “sobra” do mês.`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">
        {summaryText}{" "}
        <span className={`font-semibold ${statusClass}`}>
          {nfBRL.format(balance)}
        </span>
        .
      </p>

      <p className="text-sm text-slate-700">{interpretationText}</p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">Resumo do mês</p>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Entradas</span>
              <span className="font-semibold text-emerald-700">
                {nfBRL.format(income)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Saídas</span>
              <span className="font-semibold text-rose-700">
                {nfBRL.format(expenses)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span>Saldo</span>
              <span className={`font-semibold ${statusClass}`}>
                {nfBRL.format(balance)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">Destaques</p>

          {topCategory ? (
            <p className="mt-2 text-sm text-slate-700">
              Maior categoria de gasto:{" "}
              <span className="font-semibold">
                {categoryLabel(topCategory.category)}
              </span>
              , com{" "}
              <span className="font-semibold">
                {nfBRL.format(topCategory.amount)}
              </span>{" "}
              ({topCategory.share}% das saídas).
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-700">
              Ainda não há saídas suficientes para destacar uma categoria
              principal.
            </p>
          )}

          {topDay ? (
            <p className="mt-2 text-sm text-slate-700">
              Dia com maior gasto:{" "}
              <span className="font-semibold">{dayLabel(topDay.dayKey)}</span>,
              com{" "}
              <span className="font-semibold">
                {nfBRL.format(topDay.amount)}
              </span>{" "}
              ({topDay.share}% das saídas).
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
