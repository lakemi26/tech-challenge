"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { Transaction } from "@/services/transactions";
import Modal, { type ModalHandle } from "./Modal";
import Button from "./Button";
import { FiFileText, FiCalendar, FiTag, FiHash } from "react-icons/fi";

export interface TransactionDetailsHandle {
  open: (tx: Transaction) => void;
  close: () => void;
}

type Props = {
  onEdit?: (tx: Transaction) => void;
  onDelete?: (tx: Transaction) => void | Promise<void>;
};

const nfBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const TransactionDetailsModal = forwardRef<TransactionDetailsHandle, Props>(
  function TransactionDetailsModal({ onEdit, onDelete }, ref) {
    const modalRef = useRef<ModalHandle>(null);
    const [tx, setTx] = useState<Transaction | null>(null);

    useImperativeHandle(ref, () => ({
      open: (t) => {
        setTx(t);
        modalRef.current?.open();
      },
      close: () => modalRef.current?.close(),
    }));

    const isIncome = tx?.type === "deposito";
    const typePillText = isIncome ? "Receita" : "Despesa";
    const valueClass = isIncome ? "text-emerald-600" : "text-rose-600";
    const pillClass = isIncome
      ? "bg-emerald-100 text-emerald-700"
      : "bg-rose-100 text-rose-700";

    const longDate =
      tx?.date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) ?? "";

    function handleClose() {
      modalRef.current?.close();
    }

    function handleEdit() {
      if (tx) onEdit?.(tx);
    }

    async function handleDelete() {
      if (!tx) return;
      await onDelete?.(tx);
      modalRef.current?.close();
    }

    return (
      <Modal ref={modalRef} title="Detalhes da Transação">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Informações completas sobre esta transação financeira
          </p>

          <div className="rounded-xl border border-gray-400 bg-slate-50 p-4">
            <div className="flex justify-center mb-3">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${pillClass}`}
              >
                {typePillText}
              </span>
            </div>

            <div className={`text-center text-2xl font-semibold ${valueClass}`}>
              {tx ? (isIncome ? "+ " : "- ") : ""}
              {tx ? nfBRL.format(Math.abs(tx.value)) : "--"}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FiFileText /> <span>Descrição</span>
            </div>
            <div className="mt-1 font-medium">{tx?.description || "—"}</div>
            <hr className="mt-3" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FiCalendar /> <span>Data da transação</span>
            </div>
            <div className="mt-1 font-medium capitalize">{longDate}</div>
            <hr className="mt-3" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FiTag /> <span>Categoria</span>
            </div>
            <div className="mt-1">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                {tx?.category}
              </span>
            </div>
            <hr className="mt-3" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FiHash /> <span>ID da transação</span>
            </div>
            <div className="mt-1 break-all text-slate-700">{tx?.id}</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-gray-400">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-500">Impacto no saldo</div>
                <div
                  className={`font-medium ${
                    isIncome ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isIncome ? "Positivo" : "Negativo"}
                </div>
              </div>

              <div className="text-right">
                <div className="text-slate-500">Status</div>
                <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Concluída
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>

            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="secondary" onClick={handleEdit}>
                  Editar
                </Button>
              )}

              {onDelete && <Button onClick={handleDelete}>Excluir</Button>}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

export default TransactionDetailsModal;
