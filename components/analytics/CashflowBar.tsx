"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { Transaction } from "@/services/transactions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  transactions: Transaction[];
};

function toDayKey(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function CashflowBar({ transactions }: Props) {
  const chart = useMemo(() => {
    const byDay = new Map<string, { income: number; outflow: number }>();

    for (const t of transactions) {
      const key = toDayKey(t.date);
      const prev = byDay.get(key) ?? { income: 0, outflow: 0 };

      if (t.type === "deposito") {
        prev.income += Math.abs(t.value);
      } else {
        prev.outflow += Math.abs(t.value);
      }

      byDay.set(key, prev);
    }

    const labels = Array.from(byDay.keys()).sort();
    const income = labels.map((k) => byDay.get(k)?.income ?? 0);
    const outflow = labels.map((k) => byDay.get(k)?.outflow ?? 0);

    const shortLabels = labels.map((k) => {
      const [, mm, dd] = k.split("-");
      return `${dd}/${mm}`;
    });

    return {
      labels: shortLabels,
      datasets: [
        {
          label: "Entradas",
          data: income,
          backgroundColor: "#34D399",
        },
        {
          label: "Saídas",
          data: outflow,
          backgroundColor: "#F87171",
        },
      ],
    };
  }, [transactions]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = Number(ctx.raw ?? 0);
            return `${ctx.dataset.label}: ${val.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            Number(value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
      },
    },
  };

  const hasAny = chart.datasets.some((d) =>
    (d.data as number[]).some((n) => n > 0)
  );

  if (!hasAny) {
    return (
      <p className="text-sm text-slate-500">
        Sem transações no período para gerar o gráfico.
      </p>
    );
  }

  return <Bar data={chart} options={options} />;
}
