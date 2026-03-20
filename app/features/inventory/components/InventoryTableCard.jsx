import { Package, Pencil, Plus, Trash2 } from "lucide-react";

import { HeaderButton } from "@/components/HeaderButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getInventoryStatus,
  getStatusBadgeVariant,
} from "@/features/inventory/utils/inventoryLogic";
import { formatTimestamp } from "@/utils/formatters";

export function InventoryTableCard({
  items,
  filteredItems,
  onCreate,
  onResetFilters,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-200">
      <CardHeader className="gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <CardTitle>庫存清單</CardTitle>
          <CardDescription>
            顯示 {filteredItems.length} / {items.length} 項目
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <Package className="mb-4 size-10 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-primary">
              {items.length === 0 ? "尚未建立任何庫存項目" : "找不到符合條件的項目"}
            </h2>
            <p className="mt-2 max-w-md text-base tracking-widest text-muted-foreground">
              {items.length === 0
                ? "新增第一筆庫存資料後，即可開始追蹤補貨門檻與盤點狀態。"
                : "請調整搜尋字詞或篩選條件，查看其他庫存項目。"}
            </p>
            <div className="mt-5 flex gap-3">
              {items.length === 0 ? (
                <HeaderButton icon={Plus} text="新增第一筆資料" action={onCreate} />
              ) : (
                <HeaderButton text="清除篩選" action={onResetFilters} />
              )}
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>項目</TableHead>
                <TableHead>分類</TableHead>
                <TableHead>現有庫存</TableHead>
                <TableHead>標準存量</TableHead>
                <TableHead>補貨門檻</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>最後更新</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const status = getInventoryStatus(item);

                return (
                    <TableRow key={item.id}>
                        <TableCell className="min-w-52 whitespace-normal">
                            <div className="space-y-1">
                                <p className="font-medium text-slate-900">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    單位：{item.unit}
                                    {item.notes ? ` · ${item.notes}` : ""}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                            <span className="font-medium">{item.currentStock}</span>
                            <span className="text-muted-foreground"> {item.unit}</span>
                        </TableCell>
                        <TableCell>{item.parLevel}</TableCell>
                        <TableCell>{item.reorderThreshold}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {formatTimestamp(item.updatedAt)}
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-2">
                                <Button
                                    className="py-1 px-2"
                                    variant="outline"
                                    size="base"
                                    onClick={() => onEdit(item)}
                                >
                                    <Pencil />
                                    編輯
                                </Button>
                                <Button
                                    className="py-1 px-2"
                                    variant="destructive"
                                    size="base"
                                    onClick={() => onDelete(item)}
                                >
                                    <Trash2 />
                                    刪除
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
