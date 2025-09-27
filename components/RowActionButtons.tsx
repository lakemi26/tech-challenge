"use client";

import { useRef } from "react";
import ConfirmDeleteModal, { ConfirmDeleteHandle } from "./ConfirmDeleteModal";
import Button from "./Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  itemLabel?: string;
  onEdit?: () => void;
  onDelete?: () => Promise<void> | void;
};

export default function RowActionButtons({
  itemLabel,
  onEdit,
  onDelete,
}: Props) {
  const confirmRef = useRef<ConfirmDeleteHandle>(null);

  function openDelete() {
    confirmRef.current?.open({
      label: itemLabel,
      onConfirm: onDelete,
    });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          aria-label="Editar"
          title="Editar"
          onClick={onEdit}
          className="h-9 w-9 p-0 text-slate-800"
          icon={<FiEdit2 />}
        />

        <Button
          variant="ghost"
          aria-label="Excluir"
          title="Excluir"
          onClick={openDelete}
          className="h-9 w-9 p-0 text-slate-800"
          icon={<FiTrash2 className="h-4 w-4" />}
        />
      </div>

      <ConfirmDeleteModal ref={confirmRef} />
    </div>
  );
}
