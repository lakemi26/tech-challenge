import NewTransactionSection from "@/components/NewTransactionSection";
import PageHeading from "@/components/PageHeading";

export default function Inicio() {
  return (
    <div>
      <PageHeading
        title="Olá, {name}!"
        subtitle="Gerencie suas finanças de forma simples e eficiente"
      />
      <NewTransactionSection />
    </div>
  );
}
