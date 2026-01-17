"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal, { ModalHandle } from "./Modal";
import Button from "./Button";

export type ConfirmDeleteOpenOpts = {
  label?: string;
  onConfirm?: () => void | Promise<void>;
};

export interface ConfirmDeleteHandle {
  open: (opts?: ConfirmDeleteOpenOpts) => void;
  close: () => void;
}

const ConfirmDeleteModal = forwardRef<ConfirmDeleteHandle, object>(
  function ConfirmDeleteModal(_, ref) {
    const modalRef = useRef<ModalHandle>(null);
    const confirmRef = useRef<(() => void | Promise<void>) | null>(null);
    const [label, setLabel] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      open: (opts) => {
        setLabel(opts?.label);
        confirmRef.current = opts?.onConfirm ?? null;
        modalRef.current?.open();
      },
      close: () => modalRef.current?.close(),
    }));

    async function handleConfirm() {
      try {
        setLoading(true);
        await confirmRef.current?.();
        modalRef.current?.close();
      } finally {
        setLoading(false);
      }
    }

    return (
      <Modal ref={modalRef} title="Confirmar exclusão">
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            Tem certeza que deseja excluir a transação
            {label ? ` "${label}"` : ""}?
            <br />
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => modalRef.current?.close()}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleConfirm}
              disabled={loading}
              aria-busy={loading}
              className="bg-rose-600 text-white hover:opacity-90"
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ConfirmDeleteModal;
