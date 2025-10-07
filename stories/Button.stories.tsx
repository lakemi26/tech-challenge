import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost"],
      description: "Define o estilo visual do botão",
    },
    icon: {
      control: false,
      description: "Ícone opcional exibido antes do texto",
    },
    children: {
      control: "text",
      description: "Conteúdo interno do botão",
    },
    onClick: {
      action: "clicked",
      description: "Função chamada ao clicar no botão",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// === Stories ===

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Search",
    icon: (<svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    ),
  },
};
