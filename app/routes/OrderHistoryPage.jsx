import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { ReceiptText, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DetailItem from "@/components/common/DetailItem";
import { ORDER_HISTORY_MOCK_ORDERS } from "@/data/orders";
import { formatCurrency, formatDateTime } from "../utils/formatters";

function getOrderPreview(order) {
    return order.items.map((item) => item.name).join("、");
}

function getStatusClassName(status) {
    if (status === "已退款") {
        return "bg-amber-100 text-amber-800 ring";
    }

    return "bg-emerald-100 text-emerald-800 ring";
}

export default function OrderHistoryPage() {
    const orders = ORDER_HISTORY_MOCK_ORDERS;
    const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? null);

    const selectedOrder = useMemo(
        () => orders.find((order) => order.id === selectedOrderId) ?? null,
        [orders, selectedOrderId]
    );

    const totalQuantity = selectedOrder
        ? selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    const [darkMode, setDarkMode] = useState(() => {
        return (
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <section className="flex flex-col w-full px-2">
            <Card className="mt-2 w-full ">
                <CardHeader className="tracking-widestpro ">
                    <CardTitle className="text-xl text-foreground">歷史訂單</CardTitle>

                    <CardDescription className="text-base">
                        查閱過去所有交易細節，包括商品項目、金額、付款方式及店員資訊。
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="min-h-[80vh] w-full mt-4 grid gap-2 lg:grid-cols-[1.5fr_1fr]">
                <Card className=" min-h-[80vh] border-0 py-6 shadow-sm ring-1">
                    <CardHeader>
                        <CardTitle className="text-xl tracking-widest">訂單列表</CardTitle>
                        <CardDescription>點選訂單即可在右側查看詳細內容。</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders.length === 0 ? (
                            <div className="flex min-h-[80vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 text-center">
                                <ReceiptText className="mb-4 size-10 text-primary/90" />
                                <h2 className="text-lg font-semibold text-primary">
                                    目前沒有訂單資料
                                </h2>
                                <p className="mt-2 max-w-md text-sm text-accent-foreground">
                                    當有新交易產生後，這裡會顯示訂單記錄與右側的訂單詳細內容。
                                </p>
                            </div>
                        ) : (
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
                                    {orders.map((order) => {
                                        const isSelected = order.id === selectedOrderId;

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
                                                <TableCell className="text-foreground">
                                                    {formatDateTime(order.createdAt)}
                                                </TableCell>
                                                <TableCell className="text-foreground">
                                                    {order.cashierName}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
                <Card className="min-h-[80vh] border py-6 bg-secondary shadow-sm ring-0 w-full">
                    {selectedOrder ? (
                        <>
                            <CardHeader className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-4">
                                        <CardTitle className="text-xl tracking-widest">
                                            訂單詳細
                                        </CardTitle>
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

                            <CardContent className="flex h-full flex-col gap-6">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem label="店員" value={selectedOrder.cashierName} />
                                    <DetailItem
                                        label="付款方式"
                                        value={selectedOrder.paymentMethod}
                                    />
                                </div>

                                <div className="flex flex-1 flex-col rounded-2xl p-4 ring">
                                    <div className="mb-4 flex items-center gap-2">
                                        <ShoppingBag className="size-6 " />
                                        <h2 className="text-xl font-semibold tracking-wide text-foreground">
                                            商品內容
                                        </h2>
                                    </div>

                                    <div className="flex flex-1 flex-col gap-3">
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
                                                <div className="rounded-full px-3 py-1 text-sm font-medium text-secondary bg-accent-foreground">
                                                    x{item.quantity}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 border-t border-border pt-4">
                                        <div className="flex items-center justify-between text-sm text-primary">
                                            <span>合共商品數量</span>
                                            <span className="font-medium">{totalQuantity} 項</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-base font-semibold text-foreground">
                                            <span>訂單總額</span>
                                            <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setDarkMode(!darkMode)}
                                    variant="outline"
                                    className="h-16 rounded-xl bg-accent-foreground dark:bg-primary text-accent text-xl mx-2 ring tracking-widestpro"
                                >
                                    查看更多
                                </Button>
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                            <ReceiptText className="mb-4 size-10 text-primary" />
                            <h2 className="text-lg font-semibold text-primary">尚未選擇訂單</h2>
                            <p className="mt-2 max-w-sm text-sm text-accent-foreground">
                                請從左側訂單列表中選擇一筆訂單。
                            </p>
                        </CardContent>
                    )}
                </Card>
                {/* <div id="orderDetail">
                    
                </div> */}
            </div>
        </section>
    );
}
