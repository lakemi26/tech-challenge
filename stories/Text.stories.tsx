import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "./../components/Text";

import { colors } from "@/utils/tokens";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body", "button", "caption"],
      description: "Define o estilo tipográfico do texto.",
    },
    color: {
      control: "select",
      options: Object.keys(colors.text),
      description: "Define a cor do texto com base no token de cor.",
    },
    italic: {
      control: "boolean",
      description: "Aplica estilo itálico ao texto.",
    },
    children: {
      control: "text",
      description: "Conteúdo interno do componente.",
    },
    className: {
      control: "text",
      description: "Classe CSS opcional para customização.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente `Text` responsável por renderizar tipografia consistente com os tokens de design definidos no projeto.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Texto padrão do sistema de design",
    variant: "body",
    color: "primary",
    italic: false,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text variant="h1">Título H1</Text>
      <Text variant="h2">Título H2</Text>
      <Text variant="h3">Título H3</Text>
      <Text variant="h4">Título H4</Text>
      <Text variant="body">Texto de corpo</Text>
      <Text variant="button">Texto de botão</Text>
      <Text variant="caption">Legenda ou texto auxiliar</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstração das variações de tamanho e peso do componente `Text`.",
      },
    },
  },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {Object.keys(colors.text).map((colorKey) => (
        <Text key={colorKey} color={colorKey as keyof typeof colors.text}>
          Texto na cor: {colorKey}
        </Text>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Mostra as diferentes cores disponíveis nos tokens de texto.",
      },
    },
  },
};

export const Italic: Story = {
  args: {
    children: "Texto com estilo itálico",
    variant: "body",
    color: "primary",
    italic: true,
  },
};
