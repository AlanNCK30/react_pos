import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, ReceiptText, RotateCcw, ShoppingBag } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const matchedOrder = useMemo(
    () => ORDER_HISTORY_MOCK_ORDERS.find((item) => item.id === orderId) ?? null,
    [orderId]
  );
  const [currentOrder, setCurrentOrder] = useState(matchedOrder);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);

  useEffect(() => {
    setCurrentOrder(matchedOrder);
    setRefundDialogOpen(false);
  }, [matchedOrder]);

  if (!currentOrder) {
    return (
      <div className="min-h-[80vh] px-2 py-2">
        <PageHeader title="訂單詳情" desc="找不到指定的訂單資料。" />
        <Card className="mt-4 border-0 bg-white py-10 shadow-md ring-1 ring-slate-200">
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

  const totalQuantity = currentOrder.items.reduce((sum, item) => sum + item.quantity, 0);
  const originalAmount = currentOrder.originalAmount ?? currentOrder.totalAmount;
  const discountAmount =
    currentOrder.discountAmount ?? Math.max(originalAmount - currentOrder.totalAmount, 0);
  const promotions = currentOrder.promotions ?? [];
  const isRefunded = currentOrder.status === "已退款";

  function handleRefundConfirm() {
    setCurrentOrder((order) =>
      order
        ? {
            ...order,
            status: "已退款",
          }
        : order
    );
    setRefundDialogOpen(false);
  }

  return (
    <>
      <div className="min-h-[80vh] px-2 py-2">
        <PageHeader
          title="訂單詳情"
          desc="查看單筆訂單的商品內容、優惠明細、付款摘要與退款操作。"
          actionBtn={
            <Button variant="outline" onClick={() => navigate("/order-history")}>
              <ArrowLeft />
              返回訂單歷史
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="border-0 bg-white py-6 shadow-md ring-1 ring-slate-200">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">訂單 #{currentOrder.orderNumber}</CardTitle>
                  <CardDescription className="text-base">
                    建立時間 {formatDateTime(currentOrder.createdAt)}
                  </CardDescription>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-md font-medium ${getStatusClassName(currentOrder.status)}`}
                >
                  {currentOrder.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-md font-medium uppercase tracking-[0.24em] text-slate-500">
                    負責店員
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">
                    {currentOrder.cashierName}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-md font-medium uppercase tracking-[0.24em] text-slate-500">
                    付款方式
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">
                    {currentOrder.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-5 text-slate-600" />
                    <h2 className="text-lg font-semibold text-slate-900">商品明細</h2>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-md font-medium text-slate-600 ring-1 ring-slate-200">
                    {currentOrder.items.length} 款商品
                  </span>
                </div>

                <div className="space-y-3">
                  {currentOrder.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200"
                    >
                      <div className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-md font-semibold text-white">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-medium text-slate-900">{item.name}</p>
                        <p className="text-md text-slate-500">數量 x{item.quantity}</p>
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

          <Card className="border-0 bg-white py-6 shadow-md ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">訂單摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-center justify-between text-md text-slate-500">
                  <span>商品數量</span>
                  <span className="font-medium text-slate-900">{totalQuantity} 項</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-md text-slate-500">
                  <span>原價</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(originalAmount)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-md text-slate-500">
                  <span>優惠折抵</span>
                  <span className="font-medium text-emerald-700">
                    {discountAmount > 0 ? `-${formatCurrency(discountAmount)}` : formatCurrency(0)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-md text-slate-500">
                  <span>付款方式</span>
                  <span className="font-medium text-slate-900">{currentOrder.paymentMethod}</span>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                    <span>折後價格</span>
                    <span>{formatCurrency(currentOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">優惠詳細</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-md font-medium text-slate-600">
                    {promotions.length} 項
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {promotions.length > 0 ? (
                    promotions.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              {promotion.title}
                            </p>
                            <p className="mt-1 text-md leading-6 text-slate-500">
                              {promotion.description}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-md font-medium text-emerald-700">
                            -{formatCurrency(promotion.amount)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 px-4 py-5 text-md leading-6 text-slate-500 ring-1 ring-slate-200">
                      此訂單未套用優惠，原價與折後價格相同。
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <RotateCcw className="size-5" />
                  退款操作
                </div>
                <p className="mt-2 text-md leading-6">
                  {isRefunded ? "這張訂單已退款，不能再次發起退款。" : ""}
                </p>
                <Button
                  className="mt-4 w-full"
                  variant={isRefunded ? "outline" : "destructive"}
                  disabled={isRefunded}
                  onClick={() => setRefundDialogOpen(true)}
                >
                  {isRefunded ? "已退款" : "發起退款"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>確認退款</DialogTitle>
            <DialogDescription className="text-base">
              確認後，這張訂單會在此頁面標示為已退款，並停用再次退款按鈕。
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="flex items-center justify-between text-md text-slate-500">
              <span>訂單編號</span>
              <span className="font-medium text-slate-900">#{currentOrder.orderNumber}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-md text-slate-500">
              <span>實付金額</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(currentOrder.totalAmount)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-md text-slate-500">
              <span>目前狀態</span>
              <span className="font-medium text-slate-900">{currentOrder.status}</span>
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>取消</DialogClose>
            <Button variant="destructive" onClick={handleRefundConfirm}>
              確認退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
