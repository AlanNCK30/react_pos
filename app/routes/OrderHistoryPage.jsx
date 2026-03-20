import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
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

import DetailItem from "@/components/DetailItem";
import { ORDER_HISTORY_MOCK_ORDERS } from "@/data/orders";
import { formatCurrency, formatDateTime } from "../utils/formatters";
import { PageHeader } from "@/components/PageHeader";
import { HeaderButton } from "@/components/HeaderButton";
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
    const navigate = useNavigate();
    const orders = ORDER_HISTORY_MOCK_ORDERS;
    const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? null);

    const selectedOrder = useMemo(
        () => orders.find((order) => order.id === selectedOrderId) ?? null,
        [orders, selectedOrderId]
    );

    const totalQuantity = selectedOrder
        ? selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    return (
        <div className="min-h-[80vh] flex flex-col w-full px-2 mt-2">
            <PageHeader
                title={"歷史訂單"}
                desc={"查閱過去所有交易細節，包括商品項目、金額、付款方式及店員資訊。"}
                // actionBtn={
                //     <HeaderButton
                //         icon={ShoppingBag}
                //         text="匯出訂單"
                //         action={() => handleExport()}
                //     />
                // }
            />
            {/* <Card className=" ">
                <CardHeader className="tracking-widestpro ">
                    <CardTitle className="text-xl text-foreground"></CardTitle>

                    <CardDescription className="text-base"></CardDescription>
                </CardHeader>
            </Card> */}

            <div className=" w-full mt-4 grid gap-2 lg:grid-cols-[1.5fr_1fr]">
                <Card className=" border-0 py-6 shadow-sm ring-1 bg-card">
                    <CardHeader>
                        <CardTitle className="text-xl tracking-widestpro">訂單列表</CardTitle>
                        <CardDescription className=" text-base tracking-widestpro">
                            點選訂單即可在右側查看詳細內容。
                        </CardDescription>
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
                <Card className="min-h-[80vh] w-full overflow-hidden border bg-secondary py-6 shadow-sm ring-0">
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

                            <CardContent className="flex min-h-0 flex-1 flex-col gap-6">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem label="店員" value={selectedOrder.cashierName} />
                                    <DetailItem
                                        label="付款方式"
                                        value={selectedOrder.paymentMethod}
                                    />
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
                                    variant="outline"
                                    className="h-16 rounded-xl bg-accent-foreground dark:bg-primary text-accent text-xl mx-2 ring tracking-widestpro"
                                    onClick={() =>
                                        navigate(`/order-history/${selectedOrder.id}`)
                                    }
                                >
                                    查看更多
                                </Button>
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                            <ReceiptText className="mb-4 size-10 text-primary" />
                            <h2 className="text-lg font-semibold text-primary ">尚未選擇訂單</h2>
                            <p className="mt-2 max-w-sm text-sm text-accent-foreground">
                                請從左側訂單列表中選擇一筆訂單。
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
