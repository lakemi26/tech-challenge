import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useRef } from "react";
import Modal, { ModalHandle } from "./../components/Modal";
import Button from "../components/Button";

/**
 * Componente Modal
 *
 * Exibe um diálogo centralizado com título, conteúdo e botão de fechar.
 * É controlado de forma imperativa via ref (`open`, `close`).
 */
const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal genérico, controlado via ref, com título, botão de fechar e fechamento ao clicar no backdrop.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Título exibido no topo do modal" },
    children: { control: false, description: "Conteúdo exibido dentro do modal" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* === Story de demonstração === */

export const Default: Story = {
  render: (args) => {
    const modalRef = useRef<ModalHandle>(null);

    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Button onClick={() => modalRef.current?.open()}>
          Abrir Modal
        </Button>

        <Modal ref={modalRef} {...args}>
          <p>Este é o conteúdo do modal.</p>
          <Button onClick={() => modalRef.current?.close()}>
            Fechar Modal
          </Button>
        </Modal>
      </div>
    );
  },
  args: {
    title: "Título do Modal",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Story mostrando como abrir e fechar o Modal usando ref e interagir com seu conteúdo.",
      },
    },
  },
};
