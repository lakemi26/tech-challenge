import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useRef } from "react";
import ConfirmDeleteModal, {
  ConfirmDeleteHandle,
} from "./../components/ConfirmDeleteModal";
import Button from "../components/Button";

/**
 * O componente **ConfirmDeleteModal** exibe um diálogo de confirmação
 * para exclusão de itens. É controlado via ref (imperativo) e não
 * aparece automaticamente — deve ser aberto por código.
 *
 * Use o método `open({ label, onConfirm })` para exibi-lo.
 */
const meta: Meta<typeof ConfirmDeleteModal> = {
  title: "Components/ConfirmDeleteModal",
  component: ConfirmDeleteModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Um modal de confirmação genérico, usado para exclusões. É controlado por `ref` e deve ser aberto via método `open()`.",
      },
    },
  },
  argTypes: {}, // sem props controláveis via args
};

export default meta;
type Story = StoryObj<typeof ConfirmDeleteModal>;

/* === Stories === */

/**
 * Demonstra o funcionamento do modal usando uma ref para abrir e fechar.
 */
export const Default: Story = {
  render: () => {
    const ref = useRef<ConfirmDeleteHandle>(null);

    const handleDelete = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      alert("Item excluído com sucesso!");
    };

    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Button onClick={() => ref.current?.open({ label: "Item 42", onConfirm: handleDelete })}>
          Abrir modal de exclusão
        </Button>

        {/* O modal fica montado, mas invisível até ser aberto */}
        <ConfirmDeleteModal ref={ref} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "O exemplo abaixo mostra como usar o `ConfirmDeleteModal` com ref, permitindo abrir e fechar o modal programaticamente.",
      },
    },
  },
};
