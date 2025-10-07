import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FormField from "./../components/FormField";

/**
 * FormField é um componente de formulário genérico que suporta
 * os elementos HTML `input`, `textarea` e `select`.
 *
 * Ele inclui:
 * - label
 * - mensagem de erro
 * - variações visuais via `variant`
 * - integração com todas as props nativas do elemento escolhido
 */
const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "FormField é um campo de formulário reutilizável que adapta o tipo de input (`input`, `textarea`, `select`) e exibe labels e erros de forma padronizada.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Texto do label do campo" },
    error: { control: "text", description: "Mensagem de erro (opcional)" },
    as: {
      control: { type: "select" },
      options: ["input", "textarea", "select"],
      description: "Tipo de campo",
    },
    variant: {
      control: { type: "select" },
      options: ["surface", "subtle"],
      description: "Variação visual do campo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

/* === Stories === */

export const Input: Story = {
  args: {
    label: "Nome completo",
    placeholder: "Digite seu nome",
    as: "input",
  },
};

export const Textarea: Story = {
  args: {
    label: "Descrição",
    placeholder: "Escreva algo...",
    as: "textarea",
    rows: 4,
  },
};

export const Select: Story = {
  args: {
    label: "Categoria",
    as: "select",
    options: [
      { value: "alimentacao", label: "Alimentação" },
      { value: "transporte", label: "Transporte" },
      { value: "lazer", label: "Lazer" },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    as: "input",
    error: "Campo obrigatório",
  },
};
