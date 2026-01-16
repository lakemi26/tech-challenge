"use client";

import {
  deleteTransaction,
  onTransationsByMonth,
  Transaction,
} from "@/services/transactions";
import { Card } from "./Card";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowRightDownLine, RiArrowRightUpLine } from "react-icons/ri";
import Modal, { ModalHandle } from "./Modal";
import TransactionDetailsModal, {
  TransactionDetailsHandle,
} from "./TransactionDetailsModal";
import RowActionButtons from "./RowActionButtons";
import TransactionForm from "./TransactionForm";

import { useAppSelector } from "@/store/hooks";

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const editRef = useRef<ModalHandle>(null);
  const detailsRef = useRef<TransactionDetailsHandle>(null);

  const { period, type, category, search } = useAppSelector((s) => s.filters);

  useEffect(() => {
    const unsub = onTransationsByMonth(
      period.year,
      period.month,
      setTransactions
    );
    return () => unsub();
  }, [period.year, period.month]);

  function openView(t: Transaction) {
    detailsRef.current?.open(t);
  }

  function openEdit(t: Transaction) {
    setEditing(t);
    editRef.current?.open();
  }

  async function handleDelete(t: Transaction) {
    await deleteTransaction(t.id);
  }

  function handleEditedSaved() {
    editRef.current?.close();
    setEditing(null);
  }

  const nfBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const isIncome = (t: Transaction) => t.type === "deposito";
  const isOutflow = (t: Transaction) =>
    t.type === "saque" || t.type === "transferencia";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return transactions.filter((t) => {
      const okType = type === "all" ? true : t.type === type;
      const okCat = category === "all" ? true : t.category === category;

      const okSearch = !q
        ? true
        : (t.description ?? "").toLowerCase().includes(q);

      return okType && okCat && okSearch;
    });
  }, [transactions, type, category, search]);

  type TransactionRowProp = {
    t: Transaction;
  };

  function TransactionRow({ t }: TransactionRowProp) {
    const textColor =
      t?.type === "saque"
        ? "text-red-500"
        : t?.type === "deposito"
        ? "text-green-600"
        : "text-blue-500";

    return (
      <section
        key={t.id}
        onClick={() => openView(t)}
        className="flex justify-between rounded-lg border border-gray-200 bg-white p-5  w-full transition hover:shadow-md mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {t?.type === "deposito" ? (
            <RiArrowRightUpLine className={textColor} />
          ) : (
            <RiArrowRightDownLine className={textColor} />
          )}

          <div>
            <p className="font-semibold">{t?.description}</p>
            <p className="opacity-60">
              {t.category} •{" "}
              {t.date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>
        </div>

        <div className="text-end">
          <h2 className={`font-bold ${textColor}`}>{nfBRL.format(t.value)}</h2>

          <div className="mt-1">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              {t?.category}
            </span>
          </div>
        </div>
      </section>
    );
  }

  const columns = [
    { key: "type", label: "Tipo" },
    { key: "description", label: "Descrição" },
    { key: "category", label: "Categoria" },
    { key: "date", label: "Data" },
    { key: "value", label: "Valor", align: "right" },
    { key: "actions", label: "Ações", align: "right" },
  ];

  return (
    <>
      <Card title={`Lista de Transações`} className="mt-5">
        {filtered.length === 0 ? (
          <p>(sem transações)</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-2 border-b border-gray-200 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((t) => {
                  const textColor =
                    t.type === "saque"
                      ? "text-red-500"
                      : t.type === "deposito"
                      ? "text-green-600"
                      : "text-blue-500";

                  return (
                    <tr
                      key={t.id}
                      className="transition-all hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                    >
                      {columns.map((col) => {
                        switch (col.key) {
                          case "type":
                            return (
                              <td key={col.key} className="px-4 py-2">
                                <div className="flex items-center gap-1.5">
                                  {t?.type === "deposito" ? (
                                    <RiArrowRightUpLine className={textColor} />
                                  ) : (
                                    <RiArrowRightDownLine
                                      className={textColor}
                                    />
                                  )}
                                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                                    {t?.type}
                                  </span>
                                </div>
                              </td>
                            );

                          case "description":
                            return (
                              <td key={col.key} className="px-4 py-2">
                                {t.description}
                              </td>
                            );

                          case "category":
                            return (
                              <td key={col.key} className="px-4 py-2">
                                {t.category}
                              </td>
                            );

                          case "date":
                            return (
                              <td key={col.key} className="px-4 py-2">
                                {t.date.toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </td>
                            );

                          case "value":
                            return (
                              <td
                                key={col.key}
                                className={`px-4 py-2 text-right ${textColor}`}
                              >
                                {isIncome(t) ? "+ " : "- "}
                                {nfBRL.format(Math.abs(t.value))}
                              </td>
                            );

                          case "actions":
                            return (
                              <td
                                key={col.key}
                                className="px-4 py-2 flex justify-end"
                              >
                                <RowActionButtons
                                  itemLabel={t.description}
                                  onView={() => openView(t)}
                                  onEdit={() => openEdit(t)}
                                  onDelete={() => handleDelete(t)}
                                />
                              </td>
                            );

                          default:
                            return <td key={col.key}></td>;
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <TransactionDetailsModal
        ref={detailsRef}
        onEdit={(t) => openEdit(t)}
        onDelete={(t) => handleDelete(t)}
      />

      <Modal ref={editRef} title="Editar Transação">
        {editing ? (
          <TransactionForm
            initial={editing}
            onSaved={handleEditedSaved}
            onCancel={() => editRef.current?.close()}
          />
        ) : (
          <p>Nenhuma transação selecionada.</p>
        )}
      </Modal>
    </>
  );
}
