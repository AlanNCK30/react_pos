import { CheckCircle2, ChevronLeft } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { readLatestCheckoutResult } from "@/features/customer/data/customerCheckout";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

export default function CustomerCheckoutSuccessPage() {
  const checkoutResult = readLatestCheckoutResult();

  if (!checkoutResult) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <p className="text-xl font-semibold text-slate-950">找不到最新結帳紀錄</p>
          <p className="mt-2 text-md text-slate-500">你可以回到菜單重新開始點餐。</p>
          <Link className={`${buttonVariants({ size: "lg" })} mt-6 rounded-lg`} to="/customer/menu">
            返回菜單
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">付款成功</h1>
              <p className="mt-1 text-md text-slate-500">訂單已完成。</p>
            </div>
          </div>

          <Link
            className={`${buttonVariants({ variant: "outline" })} rounded-lg border-slate-200`}
            to="/customer/menu"
          >
            <ChevronLeft className="size-4" />
            再去點餐
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-base text-slate-500">訂單編號</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {checkoutResult.orderNumber}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-base text-slate-500">付款方式</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {checkoutResult.paymentMethod}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-base text-slate-500">優惠</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {checkoutResult.promotion.title}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-base text-slate-500">實付</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {formatCurrency(checkoutResult.totalAmount)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols">
          <section className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-2xl font-semibold text-slate-950">購買內容</h2>
            <div className="mt-4 divide-slate-100">
              {checkoutResult.items.map((item) => (
                <article key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                      <p className="mt-1 text-md text-slate-500">{item.optionsLabel}</p>
                      <p className="mt-1 text-md text-slate-500">x{item.quantity}</p>
                    </div>
                    <p className="text-md font-medium text-slate-900">
                      {formatCurrency(item.lineTotal)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-2xl font-semibold text-slate-950">付款摘要</h2>
            <div className="mt-4 space-y-3 text-md text-slate-600">
              <div className="flex items-center justify-between">
                <span>結帳時間</span>
                <span>{formatDateTime(checkoutResult.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>原價</span>
                <span>{formatCurrency(checkoutResult.originalAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>優惠折抵</span>
                <span>
                  {checkoutResult.discountAmount > 0
                    ? `-${formatCurrency(checkoutResult.discountAmount)}`
                    : formatCurrency(0)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-950">
                <span>實付金額</span>
                <span>{formatCurrency(checkoutResult.totalAmount)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
