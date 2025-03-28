import PageTemplate from "@/components/PageTemplate";
import MortgageCalculator from "./_components/MortgageCalculator";

export default function MortgageCalcPage() {
  return (
    <PageTemplate header="Mortgage Calculator" innerClassName="">
      <MortgageCalculator />
    </PageTemplate>
  );
}
