"use client";

import { BiDollar, BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { onTransationsByMonth, Transaction } from "@/services/transactions";
import React, { useEffect, useMemo, useState } from "react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

type CardType = "balance" | "monthlyIncome" | "monthlyExpenses";

type CardProps = {
  amount: number;
  type: CardType;
};

type BalanceCardProps = {
  isTransaction?: boolean;
};

export default function BalanceCard({
  isTransaction = false,
}: BalanceCardProps) {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsub = onTransationsByMonth(y, m, setTransactions);
    return () => unsub();
  }, [y, m]);

  const isIncome = (t: Transaction) => t.type === "deposito";
  const isOutflow = (t: Transaction) =>
    t.type === "saque" || t.type === "transferencia";

  const deposits = useMemo(() => transactions.filter(isIncome), [transactions]);
  const outflows = useMemo(
    () => transactions.filter(isOutflow),
    [transactions]
  );

  const balance = useMemo(
    () => transactions.reduce((sum, t) => sum + t.value, 0),
    [transactions]
  );

  const monthlyIncome = useMemo(
    () => deposits.reduce((sum, t) => sum + Math.abs(t.value), 0),
    [deposits]
  );

  const monthlyExpenses = useMemo(
    () => outflows.reduce((sum, t) => sum + Math.abs(t.value), 0),
    [outflows]
  );

  const totalIncome = monthlyIncome;
  const totalExpenses = monthlyExpenses;

  function Card({ amount, type }: CardProps) {
    const getCaption = (mode: "income" | "outflow") => {
      const count = transactions.filter((t) =>
        mode === "income" ? isIncome(t) : isOutflow(t)
      ).length;
      return count === 1 ? "1 transação" : `${count} transações`;
    };

    const isNegativeBalance = type === "balance" && amount < 0;

    const colorsByType = {
      balance: {
        bg: isNegativeBalance ? "bg-red-100" : "bg-blue-100",
        text: isNegativeBalance ? "text-red-600" : "text-blue-500",
        icon: BiDollar,
        title: isTransaction ? "Saldo Total" : "Saldo Atual",
        caption: isNegativeBalance ? "Em débito" : "Conta corrente",
      },
      monthlyIncome: {
        bg: "bg-green-100",
        text: "text-green-600",
        icon: BiTrendingUp,
        title: isTransaction ? "Total de Entradas" : "Entradas do mês",
        caption: getCaption("income"),
      },
      monthlyExpenses: {
        bg: "bg-red-100",
        text: "text-red-500",
        icon: BiTrendingDown,
        title: isTransaction ? "Total de Saídas" : "Saídas do mês",
        caption: getCaption("outflow"),
      },
    };

    const { bg, text, icon: Icon, title, caption } = colorsByType[type];

    return (
      <section className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 w-full transition hover:shadow-md">
        <div className="flex flex-row justify-between items-center pb-3">
          <p className="text-sm text-gray-600 font-semibold">{title}</p>

          {!isTransaction && (
            <div className={`rounded-2xl p-2 ${bg}`}>
              <Icon className={`h-5 w-5 ${text}`} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${text}`}>
            {formatCurrency(amount)}
          </span>

          {isNegativeBalance && (
            <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
              ⚠️ Em débito
            </span>
          )}
        </div>

        {!isTransaction && (
          <p
            className={`text-xs opacity-80 mt-2 ${
              isNegativeBalance ? "text-red-600" : "text-gray-500"
            }`}
          >
            {caption}
          </p>
        )}
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-5">
      {!isTransaction ? (
        <>
          <Card type="balance" amount={balance} />
          <Card type="monthlyIncome" amount={monthlyIncome} />
          <Card type="monthlyExpenses" amount={monthlyExpenses} />
        </>
      ) : (
        <>
          <Card type="monthlyIncome" amount={totalIncome} />
          <Card type="monthlyExpenses" amount={totalExpenses} />
          <Card type="balance" amount={balance} />
        </>
      )}
    </div>
  );
}
