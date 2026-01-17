"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  Transaction,
  onTransationsByMonth,
  deleteTransaction,
} from "@/services/transactions";

import Modal, { ModalHandle } from "./Modal";
import TransactionForm from "./TransactionForm";

import TransactionDetailsModal, {
  TransactionDetailsHandle,
} from "./TransactionDetailsModal";
import { Card } from "./Card";
import { RiArrowRightDownLine, RiArrowRightUpLine } from "react-icons/ri";

type Props = {
  year?: number;
  month1to12?: number;
};

const nfBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function DebugTransactionsList({ year, month1to12 }: Props) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month1to12 ?? now.getMonth() + 1;

  const [items, setItems] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const editRef = useRef<ModalHandle>(null);
  const detailsRef = useRef<TransactionDetailsHandle>(null);

  useEffect(() => {
    const unsub = onTransationsByMonth(y, m, setItems);
    return () => unsub();
  }, [y, m]);

  const lastFive = useMemo(() => items.slice(0, 5), [items]);

  function openView(t: Transaction) {
    detailsRef.current?.open(t);
  }

  function openEdit(t: Transaction) {
    setEditing(t);
    editRef.current?.open();
  }

  async function handleDelete(t: Transaction) {
    editRef.current?.close();
    await deleteTransaction(t.id);
  }

  function handleEditedSaved() {
    editRef.current?.close();
    setEditing(null);
  }

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
        className="flex justify-between rounded-lg border border-gray-200 bg-white p-5 w-full transition hover:shadow-md mb-3 cursor-pointer"
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

  return (
    <div>
      <Card title="Últimas transações">
        {lastFive.length === 0 ? (
          <p>(sem transações)</p>
        ) : (
          <ul>
            {lastFive.map((t) => (
              <TransactionRow t={t} key={t.id} />
            ))}
          </ul>
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
    </div>
  );
}
