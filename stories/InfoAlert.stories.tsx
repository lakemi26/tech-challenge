import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InfoAlert from "./../components/InfoAlert";

/**
 * Componente de alerta informativo.
 * Mostra uma mensagem com destaque visual em verde,
 * incluindo ícone, título e conteúdo opcional.
 */
const meta: Meta<typeof InfoAlert> = {
  title: "Components/InfoAlert",
  component: InfoAlert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Um alerta visual para informar o usuário sobre ações ou status de forma positiva. Suporta título e conteúdo adicional.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Título do alerta" },
    children: { control: "text", description: "Conteúdo adicional do alerta" },
    className: { control: "text", description: "Classes adicionais via Tailwind" },
  },
};

export default meta;
type Story = StoryObj<typeof InfoAlert>;

/* === Stories === */

export const Default: Story = {
  args: {
    title: "Ação realizada com sucesso!",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo básico mostrando apenas o título do alerta.",
      },
    },
  },
};

export const WithContent: Story = {
  args: {
    title: "Conta atualizada",
    children: "Suas informações foram salvas corretamente no sistema.",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo com conteúdo adicional exibido abaixo do título.",
      },
    },
  },
};

export const CustomClass: Story = {
  args: {
    title: "Alerta personalizado",
    children: "Exemplo de alerta com classes extras aplicadas.",
    className: "bg-emerald-100 border-emerald-300 text-emerald-900",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra como aplicar classes personalizadas via `className` para alterar visual do alerta.",
      },
    },
  },
};
