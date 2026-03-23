import { Button } from "@/components/ui/button";
import CustomerMenuSection from "@/features/customer/components/CustomerMenuSection";

export default function CustomerMenuSectionList({
  onClearFilters,
  onSelectItem,
  sections,
}) {
  if (sections.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center">
        <p className="text-base font-semibold text-slate-950">找不到符合條件的飲品</p>

        <div className="mt-5 flex justify-center gap-3">
          <Button className="rounded-lg" onClick={onClearFilters} type="button">
            清除條件
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <CustomerMenuSection key={section.id} onSelectItem={onSelectItem} section={section} />
      ))}
    </>
  );
}
