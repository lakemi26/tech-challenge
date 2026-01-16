import BalanceCard from "@/components/BalanceCard";

import NewTransactionSection from "@/components/NewTransactionSection";
import PageHeading from "@/components/PageHeading";
import RequireAuth from "@/components/RequireAuth";
import TransactionsFilters from "@/components/TransactionsFilters";
import { TransactionsTable } from "@/components/TransactionsTable";

export default function Transacoes() {
  return (
    <RequireAuth>
      <div className="p-16">
        <header className="flex items-center justify-between">
          <PageHeading
            title="Todas as transações"
            subtitle="Gerencie e visualize todas as suas transações"
          />
          <NewTransactionSection showButton />
        </header>

        <BalanceCard isTransaction />
        <TransactionsFilters />
        <TransactionsTable />
      </div>
    </RequireAuth>
  );
}
