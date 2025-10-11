import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DebugTransactionsList from "./../components/DebugTransactionsList";

/**
 * DebugTransactionsList
 *
 * Lista de transações para fins de teste e debug. Permite visualizar, editar e excluir transações.
 */
const meta: Meta<typeof DebugTransactionsList> = {
  title: "Components/DebugTransactionsList",
  component: DebugTransactionsList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DebugTransactionsList>;

export const Default: Story = {
  render: (args) => <DebugTransactionsList {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de lista de transações com botões de visualizar, editar e excluir. Usa dados mockados para demonstração.",
      },
    },
  },
};
