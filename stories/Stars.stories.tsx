import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Stars from "./../components/Stars";

const meta: Meta<typeof Stars> = {
  title: "Feedback/Stars",
  component: Stars,
  tags: ["autodocs"],
  argTypes: {
    quantity: {
      control: { type: "number", min: 0, max: 10, step: 1 },
      description: "Quantidade de estrelas exibidas.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente `Stars` exibe um conjunto de ícones de estrela (`FaStar`) conforme a quantidade definida. Ideal para avaliações e indicadores de qualidade.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stars>;

export const Default: Story = {
  args: {
    quantity: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibe um grupo de 3 estrelas amarelas representando uma nota ou nível de avaliação.",
      },
    },
  },
};

export const QuantityExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Stars quantity={1} />
      <Stars quantity={3} />
      <Stars quantity={5} />
      <Stars quantity={8} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra diferentes quantidades de estrelas renderizadas pelo componente.",
      },
    },
  },
};

export const NoStars: Story = {
  args: {
    quantity: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibe o componente sem estrelas, útil para representar ausência de avaliação.",
      },
    },
  },
};