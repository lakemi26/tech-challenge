import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spacer } from "./../components/Spacer";

const meta: Meta<typeof Spacer> = {
  title: "Layout/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Define o tamanho do espaçamento (altura ou largura).",
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: "md" },
      },
    },
    horizontal: {
      control: "boolean",
      description:
        "Define se o espaçamento é horizontal (`true`) ou vertical (`false`).",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "O componente `Spacer` adiciona espaço entre elementos, tanto vertical quanto horizontalmente, baseado em tamanhos pré-definidos do sistema de design.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Default: Story = {
  args: {
    size: "md",
    horizontal: false,
  },
  render: (args) => (
    <div className="flex flex-col items-start bg-gray-100 p-4 rounded-md">
      <div className="bg-blue-500 text-white px-2 py-1 rounded">Item 1</div>
      <Spacer {...args} />
      <div className="bg-green-500 text-white px-2 py-1 rounded">Item 2</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra o espaçamento vertical entre dois elementos usando o componente `Spacer`.",
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    size: "lg",
    horizontal: true,
  },
  render: (args) => (
    <div className="flex items-center bg-gray-100 p-4 rounded-md">
      <div className="bg-blue-500 text-white px-2 py-1 rounded">Item 1</div>
      <Spacer {...args} />
      <div className="bg-green-500 text-white px-2 py-1 rounded">Item 2</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de espaçamento horizontal entre dois elementos usando o `Spacer`.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md">
      <div className="flex flex-col">
        <div className="bg-blue-500 text-white px-2 py-1 rounded">Item</div>
        <Spacer size="sm" />
        <div className="bg-green-500 text-white px-2 py-1 rounded">sm</div>
      </div>
      <div className="flex flex-col">
        <div className="bg-blue-500 text-white px-2 py-1 rounded">Item</div>
        <Spacer size="md" />
        <div className="bg-green-500 text-white px-2 py-1 rounded">md</div>
      </div>
      <div className="flex flex-col">
        <div className="bg-blue-500 text-white px-2 py-1 rounded">Item</div>
        <Spacer size="lg" />
        <div className="bg-green-500 text-white px-2 py-1 rounded">lg</div>
      </div>
      <div className="flex flex-col">
        <div className="bg-blue-500 text-white px-2 py-1 rounded">Item</div>
        <Spacer size="xl" />
        <div className="bg-green-500 text-white px-2 py-1 rounded">xl</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstra visualmente os diferentes tamanhos de espaçamento.",
      },
    },
  },
};