import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";

export default function CustomerMenuItemRow({ item, onSelect }) {
  return (
    <article className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-5">
      <img
        alt={item.name}
        className="size-14 shrink-0 rounded-lg object-cover sm:size-16"
        loading="lazy"
        src={item.image}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
        </div>
      </div>

      <div className="ml-auto flex shrink-0 flex-col items-end gap-3">
        <div className="text-right text-md leading-6 text-slate-600">
          <p>M {formatCurrency(item.medium)}</p>
          <p>L {formatCurrency(item.large)}</p>
        </div>
        <Button className="rounded-lg" onClick={() => onSelect(item)} type="button">
          選擇
        </Button>
      </div>
    </article>
  );
}
