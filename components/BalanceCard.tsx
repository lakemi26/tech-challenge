"use client";

import { BiDollar, BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { onTransationsByMonth, Transaction } from "@/services/transactions";
import React, { useEffect, useState } from "react";

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
  isTransaction?: Boolean;
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

  useEffect(() => {
    console.log("transactions: ", transactions);
  }, [transactions]);

  const deposits = transactions.filter((t) => t.type === "deposito");
  const withdrawals = transactions.filter((t) => t.type === "saque");

  const totalDeposits = deposits.reduce((sum, t) => sum + t.value, 0);
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.value, 0);
  const balance = totalDeposits - totalWithdrawals;

  const currentMonth = new Date().getMonth();
  const monthlyIncome = deposits
    .filter((t) => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.value, 0);

  const totalIncome = deposits.reduce((sum, t) => sum + t.value, 0);

  const monthlyExpenses = withdrawals
    .filter((t) => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpenses = withdrawals.reduce((sum, t) => sum + t.value, 0);

  function Card({ amount, type }: CardProps) {
    const getCaption = (filterType: "deposito" | "saque") => {
      const count = transactions.filter(
        (t) =>
          t.type === filterType &&
          new Date(t.date).getMonth() === new Date().getMonth()
      ).length;
      return count === 1 ? "1 transação" : `${count} transações`;
    };

    const colorsByType = {
      balance: {
        bg: "bg-blue-100",
        text: "text-blue-500",
        icon: BiDollar,
        title: isTransaction ? "Saldo Total" : "Saldo Atual",
        caption: "Conta corrente",
      },
      monthlyIncome: {
        bg: "bg-green-100",
        text: "text-green-600",
        icon: BiTrendingUp,
        title: isTransaction ? "Total de Depósitos" : "Entradas do mês",
        caption: getCaption("deposito"),
      },
      monthlyExpenses: {
        bg: "bg-red-100",
        text: "text-red-500",
        icon: BiTrendingDown,
        title: isTransaction ? "Total de Saques" : "Saídas do mês",
        caption: getCaption("saque"),
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

        <div className={`text-2xl font-bold ${type !== "balance" ? text : ""}`}>
          {formatCurrency(amount)}
        </div>

        {!isTransaction && (
          <p className="text-xs text-gray-500 opacity-80 mt-2">{caption}</p>
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
