"use client";

import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { Transaction } from "@/services/transactions";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  transactions: Transaction[];
};

export default function ExpensesDoughnut({ transactions }: Props) {
  const data = useMemo(() => {
    const outflows = transactions.filter(
      (t) => t.type === "saque" || t.type === "transferencia"
    );

    const totalsByCategory = new Map<string, number>();
    for (const t of outflows) {
      const key = t.category;
      const prev = totalsByCategory.get(key) ?? 0;
      totalsByCategory.set(key, prev + Math.abs(t.value));
    }

    const labels = Array.from(totalsByCategory.keys());
    const values = Array.from(totalsByCategory.values());

    return {
      labels,
      datasets: [
        {
          label: "Gastos por categoria",
          data: values,
          borderWidth: 1,

          backgroundColor: [
            "#60A5FA",
            "#34D399",
            "#F87171",
            "#FBBF24",
            "#A78BFA",
            "#FB7185",
            "#94A3B8",
          ],
        },
      ],
    };
  }, [transactions]);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = Number(ctx.raw ?? 0);
            return `${ctx.label}: ${val.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`;
          },
        },
      },
    },
    cutout: "65%",
  };

  const hasData = (data.datasets?.[0]?.data?.length ?? 0) > 0;

  if (!hasData) {
    return (
      <p className="text-sm text-slate-500">
        Sem saídas no período para gerar o gráfico.
      </p>
    );
  }

  return <Doughnut data={data} options={options} />;
}
