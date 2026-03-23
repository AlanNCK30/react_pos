import { Package, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  getInventoryStatus,
} from "@/features/inventory/utils/inventoryLogic";

export function InventoryStatusAlert({ lowStockItems }) {
    if (lowStockItems.length > 0) {
        return (
            <Alert variant="destructive" className="border-rose-200 bg-rose-50 text-rose-900">
                <TriangleAlert className="size-6" />
                <AlertTitle>低庫存警示</AlertTitle>
                <AlertDescription className="space-y-2 text-rose-900/80">
                    <p>共有 {lowStockItems.length} 個項目需要補貨，請優先處理下列項目。</p>
                    <div className="flex flex-wrap gap-2">
                        {lowStockItems.slice(0, 5).map((item) => (
                            <Badge
                                key={item.id}
                                variant={
                                    getInventoryStatus(item) === "缺貨"
                                        ? "destructive"
                                        : "secondary"
                                }
                                className="py-4 px-2"
                            >
                                {item.name} · {item.currentStock}
                                {item.unit}
                            </Badge>
                        ))}
                    </div>
                </AlertDescription>
            </Alert>
        );
    }

    return (
      <Alert className="py-5 bg-primary text-emerald-900">
        <Package className="size-8" />
        <AlertTitle className="text-xl text-slate-800">庫存狀態正常</AlertTitle>
        <AlertDescription className=" text-xl text-slate-800">
          目前沒有項目低於補貨門檻。
        </AlertDescription>
      </Alert>
    );
}
