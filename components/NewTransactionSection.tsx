"use client";

import { useRef, useState } from "react";
import Modal, { ModalHandle } from "./Modal";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import TransactionForm from "./TransactionForm";

type Props = {
  onCreated?: () => void;
};

export default function NewTransactionSection({ onCreated }: Props) {
  const modalRef = useRef<ModalHandle>(null);
  const [formKey, setFormKey] = useState(0);

  function openModal() {
    setFormKey((k) => k + 1);
    modalRef.current?.open();
  }
  function closeModal() {
    modalRef.current?.close();
  }
  function handleSaved() {
    closeModal();
    onCreated?.();
  }

  return (
    <div>
      <section className="rounded-2xl border border-gray-400 bg-white p-5 shadow-sm my-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Nova Transação</h2>
            <p className="text-sm text-gray-600">
              Adicione uma nova transação à sua conta
            </p>
          </div>

          <Button
            onClick={openModal}
            variant="primary"
            className="shrink-0"
            aria-haspopup="dialog"
            aria-controls="transaction-modal"
          >
            <span className="inline-flex items-center gap-2">
              <FiPlus aria-hidden />
              Adicionar Transação
            </span>
          </Button>
        </div>
      </section>

      <Modal ref={modalRef} title="Nova Transação">
        <div id="transaction-modal">
          <TransactionForm
            key={formKey}
            onSaved={handleSaved}
            onCancel={closeModal}
          />
        </div>
      </Modal>
    </div>
  );
}
