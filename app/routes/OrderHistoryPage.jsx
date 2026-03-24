import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ReceiptText, Search, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import DetailItem from "@/components/DetailItem";
import { ORDER_HISTORY_MOCK_ORDERS } from "@/data/orders";
import { formatCurrency, formatDateTime } from "../utils/formatters";
import { PageHeader } from "@/components/PageHeader";

const ALL_ORDER_STATUS = "全部";
const ORDER_STATUS_OPTIONS = [ALL_ORDER_STATUS, "已完成", "已退款"];
const PAGE_SIZE = 10;

function getOrderPreview(order) {
    return order.items.map((item) => item.name).join("、");
}

function getStatusClassName(status) {
    if (status === "已退款") {
        return "bg-amber-100 text-amber-800 ring";
    }

    return "bg-emerald-100 text-emerald-800 ring";
}

function matchesOrderQuery(order, normalizedQuery) {
    if (!normalizedQuery) {
        return true;
    }

    return (
        order.orderNumber.toLowerCase().includes(normalizedQuery) ||
        order.cashierName.toLowerCase().includes(normalizedQuery) ||
        order.items.some((item) => item.name.toLowerCase().includes(normalizedQuery))
    );
}

export default function OrderHistoryPage() {
    const navigate = useNavigate();
    const orders = ORDER_HISTORY_MOCK_ORDERS;
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState(ALL_ORDER_STATUS);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? null);

    const filteredOrders = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesQuery = matchesOrderQuery(order, normalizedQuery);
            const matchesStatus =
                statusFilter === ALL_ORDER_STATUS || order.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [orders, query, statusFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query, statusFilter]);

    const totalPages = filteredOrders.length === 0 ? 0 : Math.ceil(filteredOrders.length / PAGE_SIZE);
    const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

    useEffect(() => {
        if (currentPage !== safeCurrentPage) {
            setCurrentPage(safeCurrentPage);
        }
    }, [currentPage, safeCurrentPage]);

    const paginatedOrders = useMemo(() => {
        if (filteredOrders.length === 0) {
            return [];
        }

        const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
        return filteredOrders.slice(startIndex, startIndex + PAGE_SIZE);
    }, [filteredOrders, safeCurrentPage]);

    const selectedOrder = useMemo(
        () => paginatedOrders.find((order) => order.id === selectedOrderId) ?? paginatedOrders[0] ?? null,
        [paginatedOrders, selectedOrderId]
    );

    useEffect(() => {
        if ((selectedOrder?.id ?? null) !== selectedOrderId) {
            setSelectedOrderId(selectedOrder?.id ?? null);
        }
    }, [selectedOrder, selectedOrderId]);

    const totalQuantity = selectedOrder
        ? selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;
    const hasActiveFilters = query.trim() !== "" || statusFilter !== ALL_ORDER_STATUS;
    const visibleStart = paginatedOrders.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
    const visibleEnd =
        paginatedOrders.length === 0 ? 0 : visibleStart + paginatedOrders.length - 1;

    function handleResetFilters() {
        setQuery("");
        setStatusFilter(ALL_ORDER_STATUS);
        setCurrentPage(1);
    }

    function handlePreviousPage() {
        setCurrentPage((page) => Math.max(page - 1, 1));
    }

    function handleNextPage() {
        setCurrentPage((page) => (totalPages === 0 ? page : Math.min(page + 1, totalPages)));
    }

    return (
      <div className="min-h-[80vh] flex flex-col w-full px-2 mt-2">
        <PageHeader
          title={"歷史訂單"}
          desc={"查閱過去所有交易細節，包括商品項目、金額、付款方式及店員資訊。"}
        />

        <div className=" w-full mt-4 grid gap-2 lg:grid-cols-[1.5fr_1fr]">
          <Card className=" border-0 py-6 shadow-sm ring-1 bg-card">
            <CardHeader className="gap-4">
              <CardTitle className="text-xl tracking-widestpro">訂單列表</CardTitle>
              <CardDescription className=" text-base tracking-widestpro">
                點選訂單即可在右側查看詳細內容。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.length > 0 ? (
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.6fr_0.9fr_auto]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      className="pl-9"
                      placeholder="搜尋訂單編號、商品名稱或店員"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="全部狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === ALL_ORDER_STATUS ? "全部狀態" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasActiveFilters ? (
                    <Button variant="outline" onClick={handleResetFilters}>
                      清除篩選
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      已顯示全部
                    </Button>
                  )}
                </div>
              ) : null}

              {orders.length === 0 ? (
                <div className="flex min-h-[80vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 text-center">
                  <ReceiptText className="mb-4 size-10 text-primary/90" />
                  <h2 className="text-lg font-semibold text-primary">目前沒有訂單資料</h2>
                  <p className="mt-2 max-w-md text-sm text-accent-foreground">
                    當有新交易產生後，這裡會顯示訂單記錄與右側的訂單詳細內容。
                  </p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 text-center">
                  <ReceiptText className="mb-4 size-10 text-primary/90" />
                  <h2 className="text-lg font-semibold text-primary">找不到符合條件的訂單</h2>
                  <p className="mt-2 max-w-md text-sm text-accent-foreground">
                    請調整搜尋關鍵字或狀態篩選後再試一次。
                  </p>
                </div>
              ) : (
                <>
                  <Table className="table-fixed text-base">
                    <TableHeader>
                      <TableRow className="bg-background shadow-sm">
                        <TableHead className="text-primary/90">訂單編號</TableHead>
                        <TableHead className="text-primary/90">內容</TableHead>
                        <TableHead className="text-primary/90">付款金額</TableHead>
                        <TableHead className="text-primary/90">訂單時間</TableHead>
                        <TableHead className="text-primary/90">職員</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedOrders.map((order) => {
                        const isSelected = order.id === selectedOrder?.id;

                        return (
                          <TableRow
                            key={order.id}
                            data-state={isSelected ? "selected" : undefined}
                            className={`cursor-pointer ${isSelected ? "bg-accent/90 hover:bg-accent/90" : "hover:bg-accent py-30"}`}
                            onClick={() => setSelectedOrderId(order.id)}
                          >
                            <TableCell className="font-medium text-foreground">
                              {order.orderNumber}
                            </TableCell>
                            <TableCell className="max-w-64 truncate text-foreground">
                              {getOrderPreview(order)}
                            </TableCell>
                            <TableCell className="text-foreground">
                              {formatCurrency(order.totalAmount)}
                            </TableCell>
                            <TableCell className="text-foreground truncate">
                              {formatDateTime(order.createdAt)}
                            </TableCell>
                            <TableCell className="text-foreground">{order.cashierName}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      顯示 {visibleStart}-{visibleEnd} / {filteredOrders.length} 筆，第{" "}
                      {safeCurrentPage} 頁，共 {totalPages} 頁
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        disabled={safeCurrentPage === 1}
                        onClick={handlePreviousPage}
                      >
                        上一頁
                      </Button>
                      <Button
                        variant="outline"
                        disabled={totalPages === 0 || safeCurrentPage === totalPages}
                        onClick={handleNextPage}
                      >
                        下一頁
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="min-h-[80vh] w-full overflow-hidden border bg-secondary py-6 shadow-sm ring-0">
            {selectedOrder ? (
              <>
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <CardTitle className="text-xl tracking-widest">訂單詳細</CardTitle>
                      <CardDescription>
                        訂單 #{selectedOrder.orderNumber} ·{" "}
                        {formatDateTime(selectedOrder.createdAt)}
                      </CardDescription>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClassName(selectedOrder.status)}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex min-h-0 flex-1 flex-col gap-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <DetailItem label="店員" value={selectedOrder.cashierName} />
                    <DetailItem label="付款方式" value={selectedOrder.paymentMethod} />
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col rounded-2xl p-4 ring">
                    <div className="mb-4 flex items-center gap-2">
                      <ShoppingBag className="size-6 " />
                      <h2 className="text-xl font-semibold tracking-wide text-foreground">
                        商品內容
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-accent px-4 py-3 ring"
                        >
                          <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-base font-medium text-foreground">
                              {item.name}
                            </p>
                          </div>
                          <div className="rounded-full bg-accent-foreground px-3 py-1 text-sm font-medium text-secondary">
                            x{item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-border pt-4">
                      <div className="flex items-center justify-between text-sm text-primary">
                        <span className="text-lg tracking-wider">合共商品數量</span>
                        <span className="font-medium text-lg tracking-wider">
                          {totalQuantity} 項
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-base font-semibold text-foreground">
                        <span className="text-xl tracking-wider">訂單總額</span>
                        <span className="text-xl ">
                          {formatCurrency(selectedOrder.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="h-16 rounded-xl bg-accent-foreground dark:bg-primary text-accent text-xl mx-2 ring tracking-widestpro"
                    onClick={() => navigate(`/order-history/${selectedOrder.id}`)}
                  >
                    查看更多
                  </Button>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                <ReceiptText className="mb-4 size-10 text-primary" />
                <h2 className="text-lg font-semibold text-primary ">
                  {orders.length === 0 ? "目前沒有訂單資料" : "找不到符合條件的訂單"}
                </h2>
                <p className="mt-2 max-w-sm text-sm text-accent-foreground">
                  {orders.length === 0
                    ? "當有新交易產生後，這裡會顯示訂單記錄與訂單詳細內容。"
                    : "請調整搜尋關鍵字或狀態篩選。"}
                </p>
              </CardContent>
            )}
          </Card>
          {/* <div id="orderDetail">
                    
                </div> */}
        </div>
      </div>
    );
}
