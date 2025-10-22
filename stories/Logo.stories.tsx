import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Logo from "./../components/Logo";

/**
 * Componente Logo
 *
 * Exibe o logotipo da aplicação, incluindo ícone e texto opcional.
 * Pode ser usado como link para a página inicial ou outro destino.
 */
const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Logo da aplicação com ícone e texto opcional, podendo ser personalizado via props.",
      },
    },
  },
  argTypes: {
    showText: {
      control: "boolean",
      description: "Exibe ou oculta o texto ao lado do ícone",
    },
    name: { control: "text", description: "Nome da aplicação exibido no logo" },
    href: { control: "text", description: "URL do link do logo" },
    className: { control: "text", description: "Classes adicionais via Tailwind" },
    iconSize: {
      control: "number",
      description: "Tamanho do ícone em pixels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

/* === Stories === */

export const Default: Story = {
  args: {
    showText: true,
    name: "FinanceApp",
    href: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "Logo padrão com ícone e texto visível.",
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    showText: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Exibe apenas o ícone, sem o texto ao lado.",
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    showText: true,
    iconSize: 24,
    name: "FinanceApp",
  },
  parameters: {
    docs: {
      description: {
        story: "Logo com ícone maior, mostrando customização via `iconSize`.",
      },
    },
  },
};

export const CustomClass: Story = {
  args: {
    showText: true,
    className: "bg-yellow-100 p-2 rounded-xl",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Logo com classes personalizadas, demonstrando customização de layout e cores via Tailwind.",
      },
    },
  },
};
