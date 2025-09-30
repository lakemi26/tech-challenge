import DebugTransactionsList from "@/components/DebugTransactionsList";
import NewTransactionSection from "@/components/NewTransactionSection";
import PageHeading from "@/components/PageHeading";
import RequireAuth from "@/components/RequireAuth";

export default function Inicio() {
  return (
    <RequireAuth>
      <div className="p-12">
        <header>
          <PageHeading
            title="Olá, {name}!"
            subtitle="Gerencie suas finanças de forma simples e eficiente"
          />
        </header>
        <NewTransactionSection />
        <DebugTransactionsList />
      </div>
    </RequireAuth>
  );
}
