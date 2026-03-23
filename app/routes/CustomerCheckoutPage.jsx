import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, TicketPercent } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  calculateCheckoutTotals,
  createCheckoutResult,
  customerPaymentMethods,
  customerPromotionOptions,
  getPromotionById,
  saveLatestCheckoutResult,
} from "@/features/customer/data/customerCheckout";
import { useCustomerOutlet } from "@/features/customer/hooks/useCustomerOutlet";
import { cn } from "@/lib/utils";
import { formatConfiguredLine } from "@/features/customer/hooks/useCustomerCart";
import { formatCurrency } from "@/utils/formatters";

function SelectCard({ active, children, onClick }) {
  return (
    <button
      className={cn(
        "rounded-2xl border p-4 text-left transition-colors",
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default function CustomerCheckoutPage() {
  const navigate = useNavigate();
  const { clearCart, lines, subtotal } = useCustomerOutlet();
  const [selectedPromotionId, setSelectedPromotionId] = useState("NONE");
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState("");

  const totals = useMemo(
    () => calculateCheckoutTotals(subtotal, selectedPromotionId),
    [selectedPromotionId, subtotal]
  );

  const selectedPromotion = getPromotionById(selectedPromotionId);
  const canSubmit = lines.length > 0 && selectedPaymentMethodId;

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    const nextResult = createCheckoutResult({
      discountAmount: totals.discountAmount,
      lines,
      paymentMethodId: selectedPaymentMethodId,
      promotionId: selectedPromotionId,
      totalAmount: totals.totalAmount,
    });

    saveLatestCheckoutResult(nextResult);
    clearCart();
    navigate("/customer/checkout/success");
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <p className="text-xl font-semibold text-slate-950">目前沒有可結帳的商品</p>
          <p className="mt-2 text-md text-slate-500">先回到菜單加入飲品，再進入結帳。</p>
          <Link className={`${buttonVariants({ size: "lg" })} mt-6 rounded-lg`} to="/customer/menu">
            返回菜單
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6 lg:pb-6">
      <div className="mb-4">
        <Link
          className={`${buttonVariants({ variant: "outline" })} rounded-lg border-slate-200`}
          to="/customer/menu"
        >
          <ChevronLeft className="size-4" />
          返回菜單
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">結帳</h1>
            <p className="mt-2 text-md text-slate-500">確認優惠與付款方式後完成結算。</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <TicketPercent className="size-5 text-slate-700" />
              <h2 className="text-2xl font-semibold text-slate-950">優惠選項</h2>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {customerPromotionOptions.map((promotion) => (
                <SelectCard
                  key={promotion.id}
                  active={selectedPromotionId === promotion.id}
                  onClick={() => setSelectedPromotionId(promotion.id)}
                >
                  <p className="text-lg font-semibold">{promotion.title}</p>
                  <p
                    className={cn(
                      "mt-2 text-md leading-6",
                      selectedPromotionId === promotion.id ? "text-slate-200" : "text-slate-500"
                    )}
                  >
                    {promotion.description}
                  </p>
                </SelectCard>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-2xl font-semibold text-slate-950">付款方式</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {customerPaymentMethods.map((paymentMethod) => (
                <SelectCard
                  key={paymentMethod.id}
                  active={selectedPaymentMethodId === paymentMethod.id}
                  onClick={() => setSelectedPaymentMethodId(paymentMethod.id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      alt={paymentMethod.label}
                      className="size-10 rounded-lg object-contain bg-white p-1"
                      loading="lazy"
                      src={paymentMethod.icon}
                    />
                    <p className="text-lg font-semibold">{paymentMethod.label}</p>
                  </div>
                </SelectCard>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-2xl font-semibold text-slate-950">訂單摘要</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {lines.map((line) => (
                <article key={line.lineId} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-lg font-semibold text-slate-950">{line.itemName}</p>
                      <p className="mt-1 text-md text-slate-500">{formatConfiguredLine(line)}</p>
                      <p className="mt-1 text-md text-slate-500">x{line.quantity}</p>
                    </div>
                    <p className="text-md font-medium text-slate-900">
                      {formatCurrency(line.unitPrice * line.quantity)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="space-y-3 text-md text-slate-600">
              <div className="flex items-center justify-between">
                <span>原價</span>
                <span>{formatCurrency(totals.originalAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{selectedPromotion.title}</span>
                <span>
                  {totals.discountAmount > 0
                    ? `-${formatCurrency(totals.discountAmount)}`
                    : formatCurrency(0)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-950">
                <span>應付金額</span>
                <span>{formatCurrency(totals.totalAmount)}</span>
              </div>
            </div>

            <Button
              className="mt-5 hidden w-full rounded-lg lg:inline-flex"
              disabled={!canSubmit}
              onClick={handleSubmit}
              type="button"
            >
              確認付款
            </Button>
          </section>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-md text-slate-500">應付金額</p>
            <p className="text-2xl font-semibold text-slate-950">
              {formatCurrency(totals.totalAmount)}
            </p>
          </div>
          <Button className="rounded-lg" disabled={!canSubmit} onClick={handleSubmit} type="button">
            <CheckCircle2 className="size-4" />
            確認付款
          </Button>
        </div>
      </div>
    </main>
  );
}
