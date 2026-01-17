# FinanceApp - Sistema de Gestão Financeira Pessoal

Aplicação web desenvolvida para o controle e análise de finanças pessoais, permitindo o registro de transações, visualização de saldo, filtros avançados e análises financeiras com gráficos interativos.

O projeto foi desenvolvido como parte de um trabalho acadêmico, aplicando boas práticas de **Front-end moderno**, **gestão de estado**, **validação avançada**, **tipagem forte com TypeScript** e **integração com Firebase**.

---

## 📌 Funcionalidades Principais

### Autenticação

- Cadastro de usuário
- Login e logout
- Recuperação de senha
- Autenticação via Firebase Authentication

### Transações

- Cadastro de transações financeiras
  - Depósito
  - Saque
  - Transferência
- Edição e exclusão de transações
- Validação avançada de dados (regras de negócio)
- Atualização em tempo real sem recarregar a página

### Filtros e Pesquisa

- Filtro por:
  - Mês
  - Ano
  - Tipo de transação
  - Categoria
- Busca textual por descrição
- Filtros centralizados e gerenciados via Redux

### Análises Financeiras

- Saldo atual
- Total de entradas e saídas do período
- Gráfico de rosca (Doughnut):
  - Distribuição de gastos por categoria
- Gráfico de barras:
  - Entradas vs saídas ao longo do tempo
- Insights automáticos baseados no período selecionado

### Listagem de Transações

- Paginação dentro do container
- Ordenação por data
- Visualização de detalhes em modal
- Interface responsiva e acessível

---

## Gestão de Estado

A aplicação utiliza **Redux Toolkit** para gerenciar estados globais, como:

- Filtros de transações
- Período selecionado (mês e ano)
- Pesquisa textual

Isso garante:

- Melhor organização do código
- Facilidade de manutenção
- Comunicação eficiente entre componentes

---

## Validações Avançadas

As validações são feitas com **Zod**, garantindo:

- Tipos corretos de dados
- Regras de negócio, como:
  - Datas futuras não são permitidas
  - Valores inválidos não podem ser enviados
- Mensagens de erro claras para o usuário

---

## ⚙️ Tecnologias Utilizadas

### Front-end

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Hook Form**
- **Zod**
- **Chart.js**

### Back-end / Infraestrutura

- **Firebase Authentication**
- **Firebase Firestore**

---

## Renderização e Performance

- Utilização de **SSR (Server-Side Rendering)** e **renderização dinâmica** quando necessário
- Otimização de performance e carregamento
- Atualização em tempo real dos dados com Firestore

---

## Responsividade e UX

- Layout responsivo para desktop e dispositivos móveis
- Componentes reutilizáveis
- Feedback visual para carregamento e erros
- Interface clara e intuitiva, focada na experiência do usuário

---

## 🚀 Como rodar em desenvolvimento

- Clone o repositório
- Coloque o .env no root do projeto
- Rode o comando "pnpm install" -> para instalar as dependências necessárias
- Em seguida rode o comando "npm run dev"
- Acesse https://localhost:3000 para testar localmente.

- Design do projeto: [Figma](https://www.figma.com/design/mWVIqpHD8soq27jWtRpA3o/Design-System---FIAP?node-id=0-1&t=ZPiE2PDKgnkYp4vj-1)

---

## 📝 Considerações Finais

Este projeto demonstra a aplicação prática de conceitos modernos de desenvolvimento web, com foco em **organização**, **qualidade de código**, **experiência do usuário** e **boas práticas de engenharia de software**.

Ele pode ser facilmente expandido com novas funcionalidades, como:

- Comparação entre períodos
- Exportação de dados
- Alertas financeiros inteligentes

---
