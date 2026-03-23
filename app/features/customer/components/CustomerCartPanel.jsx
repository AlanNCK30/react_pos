import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatConfiguredLine } from "@/features/customer/hooks/useCustomerCart";

import { formatCurrency } from "@/utils/formatters";

export default function CustomerCartPanel({
  className,
  itemCount,
  lines,
  subtotal,
  onClearCart,
  onRemoveLine,
  onUpdateQuantity,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">購物袋</h2>
          <p className="mt-1 text-md text-slate-500">{`共 ${itemCount} 件`}</p>
        </div>
        <Button
          className="rounded-lg"
          disabled={lines.length === 0}
          onClick={onClearCart}
          type="button"
          variant="outline"
        >
          清空
        </Button>
      </div>

      <div className="px-4">
        {lines.length === 0 ? (
          <div className="py-10 text-sm text-slate-500">尚未加入購物車。</div>
        ) : (
          <div className="">
            {lines.map((line) => (
              <article key={line.lineId} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xl font-semibold text-slate-950">{line.itemName}</p>
                    <p className="mt-1 text-md text-slate-500">{formatConfiguredLine(line)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-md text-slate-500">{formatCurrency(line.unitPrice)}</p>
                    <p className="text-md font-semibold text-slate-950">
                      {formatCurrency(line.unitPrice * line.quantity)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      aria-label={`減少 ${line.itemName} 數量`}
                      onClick={() => onUpdateQuantity(line.lineId, line.quantity - 1)}
                      size="icon-sm"
                      type="button"
                      variant="outline"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="min-w-6 text-center text-sm font-medium text-slate-950">
                      {line.quantity}
                    </span>
                    <Button
                      aria-label={`增加 ${line.itemName} 數量`}
                      onClick={() => onUpdateQuantity(line.lineId, line.quantity + 1)}
                      size="icon-sm"
                      type="button"
                      variant="outline"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>

                  <Button
                    className="rounded-lg px-2 text-slate-500 hover:text-rose-600"
                    onClick={() => onRemoveLine(line.lineId)}
                    type="button"
                    variant="ghost"
                  >
                    <Trash2 className="size-4" />
                    移除
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4">
        <span className="text-sm text-slate-500">小計</span>
        <span className="text-xl font-semibold text-slate-950">{formatCurrency(subtotal)}</span>
      </div>
    </section>
  );
}
