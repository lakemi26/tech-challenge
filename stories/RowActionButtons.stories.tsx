import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RowActionButtons from "./../components/RowActionButtons";

export default {
  title: "Components/RowActionButtons",
  component: RowActionButtons,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Botões de ação para cada linha de item, incluindo visualizar, editar e excluir. O delete abre um modal de confirmação.",
      },
    },
  },
  argTypes: {
    itemLabel: { control: "text", description: "Label do item para exibir no modal de confirmação" },
    onView: { action: "view", description: "Callback ao clicar no botão Ver" },
    onEdit: { action: "edit", description: "Callback ao clicar no botão Editar" },
    onDelete: { action: "delete", description: "Callback ao confirmar exclusão" },
  },
} as Meta<typeof RowActionButtons>;

type Story = StoryObj<typeof RowActionButtons>;

/* === Stories === */

export const Default: Story = {
  args: {
    itemLabel: "Transação 01",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão de RowActionButtons com label de item e callbacks mockados.",
      },
    },
  },
};

export const WithoutDelete: Story = {
  args: {
    itemLabel: "Transação 02",
    onDelete: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo mostrando os botões sem a ação de excluir. O botão delete não abre o modal.",
      },
    },
  },
};
