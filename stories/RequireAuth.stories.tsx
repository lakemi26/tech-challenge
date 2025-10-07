import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RequireAuth from "./../components/RequireAuth";
import { useState } from "react";

/**
 * RequireAuth
 *
 * Componente que protege rotas, permitindo renderizar children apenas para usuários autenticados.
 * Usuários não autenticados são redirecionados para a página de login.
 */
const meta: Meta<typeof RequireAuth> = {
  title: "Components/RequireAuth",
  component: RequireAuth,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper para proteger rotas, renderizando o conteúdo apenas se o usuário estiver autenticado.",
      },
    },
  },
  argTypes: {
    children: { control: false, description: "Conteúdo protegido a ser renderizado" },
  },
};

export default meta;
type Story = StoryObj<typeof RequireAuth>;

/* === Story de demonstração === */

export const Authenticated: Story = {
  render: () => {
    const [mockUser] = useState({ uid: "1", name: "Helena" });

    // Mock do hook useAuthUser
    const MockRequireAuth = ({ children }: { children: React.ReactNode }) => {
      return mockUser ? <>{children}</> : <div>Redirecionando...</div>;
    };

    return (
      <MockRequireAuth>
        <div className="p-4 border border-green-400">
          Conteúdo protegido exibido apenas para usuários autenticados.
        </div>
      </MockRequireAuth>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo mostrando o conteúdo protegido para um usuário autenticado (mockado).",
      },
    },
  },
};

export const Unauthenticated: Story = {
  render: () => {
    // Mock do hook useAuthUser retornando null
    const MockRequireAuth = ({ children }: { children: React.ReactNode }) => {
      const user = null; // usuário não autenticado
      if (user === null) return <div>Redirecionando para Login...</div>;
      return <>{children}</>;
    };

    return (
      <MockRequireAuth>
        <div className="p-4 border border-red-400">
          Este conteúdo não deveria ser exibido.
        </div>
      </MockRequireAuth>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo mostrando o comportamento quando o usuário não está autenticado (mock).",
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    // Mock do hook useAuthUser retornando undefined (carregando)
    const MockRequireAuth = ({ children }: { children: React.ReactNode }) => {
      const user = undefined;
      if (user === undefined) return <div>Carregando…</div>;
      return <>{children}</>;
    };

    return (
      <MockRequireAuth>
        <div className="p-4 border border-yellow-400">
          Este conteúdo será exibido apenas quando o usuário estiver carregado.
        </div>
      </MockRequireAuth>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo mostrando o estado de carregamento do usuário.",
      },
    },
  },
};
