import PageHeading from "@/components/PageHeading";
import RequireAuth from "@/components/RequireAuth";

export default function Transacoes() {
  return (
    <RequireAuth>
      <div>
        <header>
          <PageHeading
            title="Todas as transações"
            subtitle="Gerencie e visualize todas as suas transações"
          />
        </header>
      </div>
    </RequireAuth>
  );
}
