"use client";

import { useRef } from "react";
import ConfirmDeleteModal, { ConfirmDeleteHandle } from "./ConfirmDeleteModal";
import Button from "./Button";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

type Props = {
  itemLabel?: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => Promise<void> | void;
};

export default function RowActionButtons({
  itemLabel,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const confirmRef = useRef<ConfirmDeleteHandle>(null);

  function openDelete() {
    if (!onDelete) return;
    confirmRef.current?.open({
      label: itemLabel,
      onConfirm: onDelete,
    });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          aria-label="Ver detalhes"
          title="Ver detalhes"
          onClick={onView}
          className="h-9 w-9 p-0 text-slate-800"
          icon={<FiEye />}
        />

        <Button
          type="button"
          variant="ghost"
          aria-label="Editar"
          title="Editar"
          onClick={onEdit}
          className="h-9 w-9 p-0 text-slate-800"
          icon={<FiEdit2 />}
        />

        <Button
          type="button"
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
