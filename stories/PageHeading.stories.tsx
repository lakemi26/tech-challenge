import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PageHeading from "./../components/PageHeading";

/**
 * PageHeading
 *
 * Cabeçalho de página com título e subtítulo.
 * Suporta substituição de `{name}` pelo primeiro nome do usuário.
 */
const meta: Meta<typeof PageHeading> = {
  title: "Components/PageHeading",
  component: PageHeading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cabeçalho de página com título dinâmico, substituição de `{name}` e subtítulo opcional.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Título principal (pode conter `{name}`)" },
    subtitle: { control: "text", description: "Subtítulo opcional" },
    name: { control: "text", description: "Nome do usuário (substitui `{name}` se fornecido)" },
    useNameFromAuth: {
      control: "boolean",
      description:
        "Se verdadeiro, obtém nome do usuário logado via Firebase Auth; se falso, usa prop `name`",
    },
    className: { control: "text", description: "Classes adicionais via Tailwind" },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

/* === Stories === */

export const Default: Story = {
  args: {
    title: "Bem-vindo à plataforma",
    subtitle: "Organize suas finanças com facilidade",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo simples com título fixo e subtítulo.",
      },
    },
  },
};

export const WithDynamicName: Story = {
  args: {
    title: "Olá, {name}!",
    subtitle: "Estamos felizes em te ver por aqui.",
    name: "Helena Camañes",
    useNameFromAuth: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Título usando placeholder `{name}`, substituído pelo prop `name`. O uso de `useNameFromAuth` está desativado para demo.",
      },
    },
  },
};

export const CustomClass: Story = {
  args: {
    title: "Cabeçalho estilizado",
    subtitle: "Com classes personalizadas",
    className: "text-center text-blue-700",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo mostrando como adicionar classes personalizadas via `className`.",
      },
    },
  },
};
