import PageTemplate from "@/components/PageTemplate";
import UndoableCounter from "./_components/UndoableCounter";

export default function UndoableCounterPage() {
  return (
    <PageTemplate header="Undoable Counter">
      <UndoableCounter />
    </PageTemplate>
  );
}
