import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useRef } from "react";
import TransactionDetailsModal, { TransactionDetailsHandle } from "../components/TransactionDetailsModal";
import Button from "../components/Button";
import { Transaction } from "@/services/transactions";

/**
 * TransactionDetailsModal
 *
 * Modal que exibe informações detalhadas de uma transação, com ações de editar e excluir.
 */
const meta: Meta<typeof TransactionDetailsModal> = {
  title: "Components/TransactionDetailsModal",
  component: TransactionDetailsModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal mostrando detalhes completos de uma transação, com botão de editar e excluir (confirmação).",
      },
    },
  },
  argTypes: {
    onEdit: { action: "edit", description: "Callback ao clicar no botão Editar" },
    onDelete: { action: "delete", description: "Callback ao confirmar exclusão" },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionDetailsModal>;

/* === Mock da transação === */

const mockTransaction: Transaction = {
  id: "tx-123456",
  uid: "user-001",
  type: "deposito", // use o literal correto do tipo TransactionType
  value: 2500,
  description: "Salário de setembro",
  category: "salario", // literal correto do TransactionCategory
  date: new Date(2025, 8, 30), // 30/09/2025
};

/* === Story de demonstração === */

export const Default: Story = {
  render: (args) => {
    const modalRef = useRef<TransactionDetailsHandle>(null);

    const openModal = () => modalRef.current?.open(mockTransaction);

    return (
      <div className="p-8">
        <Button onClick={openModal}>Abrir Detalhes da Transação</Button>

        <TransactionDetailsModal ref={modalRef} {...args} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo mostrando o modal com detalhes de uma transação mockada. O modal é controlado via ref e permite edição e exclusão.",
      },
    },
  },
};
