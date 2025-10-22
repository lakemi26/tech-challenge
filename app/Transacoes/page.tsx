import BalanceCard from "@/components/BalanceCard";
import { Header } from "@/components/Header";

import NewTransactionSection from "@/components/NewTransactionSection";
import PageHeading from "@/components/PageHeading";
import RequireAuth from "@/components/RequireAuth";
import { TransactionsTable } from "@/components/TransactionsTable";

export default function Transacoes() {
  return (
    <RequireAuth>
      <Header />
      <div className="p-12">
        <header className="flex items-center justify-between">
          <PageHeading
            title="Todas as transações"
            subtitle="Gerencie e visualize todas as suas transações"
          />
          <NewTransactionSection showButton />
        </header>
        <BalanceCard isTransaction />
        <TransactionsTable />
      </div>
    </RequireAuth>
  );
}
