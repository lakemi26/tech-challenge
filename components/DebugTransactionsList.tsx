"use client";

import { useEffect, useRef, useState } from "react";
import {
  Transaction,
  onTransationsByMonth,
  deleteTransaction,
} from "@/services/transactions";
import RowActionButtons from "./RowActionButtons";
import Modal, { ModalHandle } from "./Modal";
import TransactionForm from "./TransactionForm";

import TransactionDetailsModal, {
  TransactionDetailsHandle,
} from "./TransactionDetailsModal";

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

  return (
    <div>
      <h3>
        Transações de {String(m).padStart(2, "0")}/{y}
      </h3>

      {items.length === 0 ? (
        <p>(sem transações)</p>
      ) : (
        <ul>
          {items.map((t) => (
            <li key={t.id}>
              <span>
                {t.description || "(sem descrição)"} — {t.type} — {t.category} —{" "}
                {nfBRL.format(t.value)} — {t.date.toLocaleDateString("pt-BR")}
              </span>{" "}
              <RowActionButtons
                itemLabel={t.description}
                onView={() => openView(t)}
                onEdit={() => openEdit(t)}
                onDelete={() => handleDelete(t)}
              />
            </li>
          ))}
        </ul>
      )}

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
