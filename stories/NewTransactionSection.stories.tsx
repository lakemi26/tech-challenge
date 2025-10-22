import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import NewTransactionSection from "./../components/NewTransactionSection";

/**
 * Seção para criar novas transações.
 *
 * Mostra um botão que abre um modal com o formulário de transação.
 * O modal é controlado via ref e o formulário reinicia a cada abertura.
 */
const meta: Meta<typeof NewTransactionSection> = {
  title: "Components/NewTransactionSection",
  component: NewTransactionSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Seção que permite adicionar novas transações. Inclui botão, modal controlado via ref e formulário interno.",
      },
    },
  },
  argTypes: {
    onCreated: {
      action: "onCreated",
      description: "Callback chamado após a transação ser criada com sucesso",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewTransactionSection>;

/* === Stories === */

export const Default: Story = {
  render: (args) => {
    const [createdCount, setCreatedCount] = useState(0);

    return (
      <div className="p-8">
        <p className="mb-4 font-medium">
          Transações criadas: {createdCount}
        </p>
        <NewTransactionSection
          {...args}
          onCreated={() => {
            setCreatedCount((c) => c + 1);
            args.onCreated?.();
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Story mostrando a seção de criação de novas transações. Cada clique no botão abre o modal com o formulário.",
      },
    },
  },
};
