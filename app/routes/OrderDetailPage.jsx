import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, ReceiptText, RotateCcw, ShoppingBag } from "lucide-react";

import DetailItem from "@/components/DetailItem";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ORDER_HISTORY_MOCK_ORDERS } from "@/data/orders";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

function getStatusClassName(status) {
  if (status === "已退款") {
    return "bg-amber-100 text-amber-800 ring";
  }

  return "bg-emerald-100 text-emerald-800 ring";
}

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const order = useMemo(
    () => ORDER_HISTORY_MOCK_ORDERS.find((item) => item.id === orderId) ?? null,
    [orderId]
  );

  if (!order) {
    return (
      <div className="min-h-[80vh] px-2 py-2">
        <PageHeader title="訂單詳情" desc="找不到指定的訂單資料。" />
        <Card className="mt-4 border-0 bg-white py-10 shadow-sm ring-1 ring-slate-200">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <ReceiptText className="mb-4 size-10 text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-900">此訂單不存在</h2>
            <p className="mt-2 text-slate-500">請返回訂單歷史頁面重新選擇一筆訂單。</p>
            <Button className="mt-5" onClick={() => navigate("/order-history")}>
              <ArrowLeft />
              返回訂單歷史
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-[80vh] px-2 py-2">
      <PageHeader
        title={`訂單 #${order.orderNumber}`}
        desc="檢視完整訂單收據、商品內容、付款資訊與退款操作區。"
        actionBtn={
          <Button variant="outline" onClick={() => navigate("/order-history")}>
            <ArrowLeft />
            返回訂單歷史
          </Button>
        }
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="border-0 bg-white py-6 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl">訂單收據</CardTitle>
                <CardDescription className="text-base">
                  {formatDateTime(order.createdAt)} · {order.paymentMethod}
                </CardDescription>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClassName(order.status)}`}>
                {order.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="店員" value={order.cashierName} />
              <DetailItem label="付款方式" value={order.paymentMethod} />
              <DetailItem label="商品數量" value={`${totalQuantity} 項`} />
              <DetailItem label="訂單總額" value={formatCurrency(order.totalAmount)} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center gap-2">
                <ShoppingBag className="size-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">商品明細</h2>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
                    <div className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">數量 x{item.quantity}</p>
                    </div>
                    <div className="text-right text-base font-semibold text-slate-900">
                      {formatCurrency(item.lineTotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white py-6 shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl">付款摘要</CardTitle>
            <CardDescription className="text-base">
              檢視訂單總額與退款操作區。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>商品數量</span>
                <span className="font-medium text-slate-900">{totalQuantity} 項</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>付款方式</span>
                <span className="font-medium text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                  <span>訂單總額</span>
                  <span>{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <RotateCcw className="size-5" />
                退款操作
              </div>
              <p className="mt-2 text-sm leading-6">
                v1 先提供操作入口與視覺區塊，實際退款流程可在下一步接入。
              </p>
              <Button className="mt-4 w-full" variant="outline">
                發起退款
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
