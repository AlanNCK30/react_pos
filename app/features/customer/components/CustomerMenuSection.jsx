import CustomerMenuItemRow from "@/features/customer/components/CustomerMenuItemRow";

export default function CustomerMenuSection({ onSelectItem, section }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
        <h2 className="text-xl font-semibold text-slate-950">{section.name}</h2>
        <p className="mt-1 text-md text-slate-500">{section.description}</p>
      </div>

      <div className="divide-y divide-slate-100">
        {section.items.map((item) => (
          <CustomerMenuItemRow key={item.id} item={item} onSelect={onSelectItem} />
        ))}
      </div>
    </section>
  );
}
