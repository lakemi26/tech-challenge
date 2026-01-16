import BalanceCard from "@/components/BalanceCard";
import PageHeading from "@/components/PageHeading";

export default function AnalisesPage() {
  return (
    <div className="p-8">
      <header className="flex items-center justify-between">
        <PageHeading
          title="Análises"
          subtitle="Mais informações sobre as suas finanças"
        />
      </header>
      <BalanceCard />
    </div>
  );
}
