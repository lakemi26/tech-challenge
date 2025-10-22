import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AuthCard from "./../components/AuthCard";

/**
 * O componente **AuthCard** é usado como container visual para páginas de autenticação,
 * como login, cadastro e recuperação de senha.
 *
 * Ele fornece um layout centralizado com título, subtítulo, conteúdo principal (children)
 * e um rodapé opcional (footer).
 */
const meta: Meta<typeof AuthCard> = {
  title: "Components/AuthCard",
  component: AuthCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "O **AuthCard** cria um container elegante e padronizado para formulários de autenticação, com suporte a título, subtítulo e rodapé.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Título exibido no topo do card.",
    },
    subtitle: {
      control: "text",
      description: "Subtítulo opcional exibido abaixo do título.",
    },
    children: {
      control: false,
      description: "Conteúdo principal do card (geralmente um formulário).",
    },
    footer: {
      control: false,
      description: "Rodapé opcional exibido abaixo do conteúdo principal.",
    },
    className: {
      control: "text",
      description:
        "Classes adicionais para estilização personalizada via Tailwind CSS.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthCard>;

/* === Stories === */

/**
 * Exemplo padrão do AuthCard, usado para telas de login ou cadastro.
 */
export const Default: Story = {
  args: {
    title: "Entrar",
    subtitle: "Acesse sua conta para continuar",
    children: (
      <form className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          className="w-full rounded-md border p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full rounded-md border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-semibold text-white hover:bg-black/90"
        >
          Entrar
        </button>
      </form>
    ),
    footer: (
      <>
        Não tem uma conta?{" "}
        <a href="#" className="font-medium text-black hover:underline">
          Cadastre-se
        </a>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uso padrão do **AuthCard** em uma página de login, com título, subtítulo, formulário e rodapé.",
      },
    },
  },
};

/**
 * Variante sem subtítulo nem rodapé — ideal para telas simples, como reset de senha.
 */
export const Simple: Story = {
  args: {
    title: "Redefinir senha",
    children: (
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="w-full rounded-md border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-semibold text-white hover:bg-black/90"
        >
          Enviar link
        </button>
      </form>
    ),
  },
};