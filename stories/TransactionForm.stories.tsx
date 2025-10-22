import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";
import type { Transaction, TransactionType, TransactionCategory } from "@/services/transactions";

/**
 * TransactionForm
 *
 * Formulário para criar ou editar transações financeiras.
 * Inclui tipo, valor, descrição, categoria e data.
 */
const meta: Meta<typeof TransactionForm> = {
  title: "Components/TransactionForm",
  component: TransactionForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Formulário para criação/edição de transações financeiras, com validação de campos e máscara de valores em BRL.",
      },
    },
  },
  argTypes: {
    onSaved: { action: "saved", description: "Callback chamado ao salvar a transação" },
    onCancel: { action: "cancelled", description: "Callback chamado ao cancelar o formulário" },
    initial: { control: false, description: "Transação inicial para edição (opcional)" },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionForm>;

/* === Stories === */

/** Formulário para criar uma nova transação */
export const NewTransaction: Story = {
  render: (args) => <TransactionForm {...args} />,
  parameters: {
    docs: {
      description: { story: "Exemplo de formulário para adicionar uma nova transação." },
    },
  },
};

/** Formulário para editar uma transação existente */
export const EditTransaction: Story = {
  render: (args) => {
    const [initial] = useState<Transaction>({
      id: "tx-123",
      uid: "user-001",
      type: "deposito" as TransactionType,
      value: 1250,
      description: "Salário",
      category: "salario" as TransactionCategory,
      date: new Date(),
    });

    return <TransactionForm {...args} initial={initial} />;
  },
  parameters: {
    docs: {
      description: { story: "Exemplo de formulário para edição de uma transação existente." },
    },
  },
};
