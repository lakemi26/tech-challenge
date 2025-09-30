"use client";

import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import { FiX } from "react-icons/fi";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

type ModalProps = {
  title: string;
  children: ReactNode;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { title, children },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  function onBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      dialogRef.current?.close();
    }
  }

  function onCancel(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={onBackdropClick}
      onCancel={onCancel}
      className="m-auto w-full max-w-lg rounded-2xl  bg-white p-6 shadow-lg backdrop:bg-black/40"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-back hover:bg-gray-100">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Fechar"
        >
          <FiX size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
});

export default Modal;
