"use client";

import FormField from "@/components/FormField";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPeriod } from "@/store/filtersSlice";

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

export default function AnalyticsPeriodFilter() {
  const dispatch = useAppDispatch();
  const { period } = useAppSelector((s) => s.filters);

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return { value: String(m), label: monthLabel(m) };
  });

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { value: String(y), label: String(y) };
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          <FormField
            as="select"
            label="Mês"
            variant="subtle"
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
            variant="subtle"
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
        </div>
      </div>
    </div>
  );
}
