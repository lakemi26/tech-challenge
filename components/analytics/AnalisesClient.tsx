"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeading from "@/components/PageHeading";
import BalanceCard from "@/components/BalanceCard";
import {
  onTransationsByMonth,
  type Transaction,
} from "@/services/transactions";
import { useAppSelector } from "@/store/hooks";

import { Card } from "@/components/Card";
import AnalyticsPeriodFilter from "./AnalyticsPeriodFilter";
import ExpensesDoughnut from "./ExpensesDoughnut";
import CashflowBar from "./CashflowBar";
import FinancialInsights from "./FinancialInsights";

export default function AnalisesClient() {
  const { period } = useAppSelector((s) => s.filters);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsub = onTransationsByMonth(
      period.year,
      period.month,
      setTransactions
    );
    return () => unsub();
  }, [period.year, period.month]);

  const periodLabel = useMemo(() => {
    const d = new Date(period.year, period.month - 1, 1);
    return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }, [period.year, period.month]);

  return (
    <div className="p-8">
      <header className="flex items-center justify-between">
        <PageHeading
          title="Análises"
          subtitle="Mais informações sobre as suas finanças"
        />
      </header>

      <BalanceCard />

      <div className="mt-5">
        <AnalyticsPeriodFilter />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card
          title="Gastos por categoria"
          subtitle={`Distribuição das saídas em ${periodLabel}`}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <ExpensesDoughnut transactions={transactions} />
          </div>
        </Card>

        <Card
          title="Fluxo de caixa"
          subtitle={`Entradas vs saídas por dia em ${periodLabel}`}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-2xl">
            <CashflowBar transactions={transactions} />
          </div>
        </Card>

        <Card
          title="Insights"
          subtitle={`Resumo e destaques de ${periodLabel}`}
          className="lg:col-span-2"
        >
          <FinancialInsights transactions={transactions} />
        </Card>
      </div>
    </div>
  );
}
