import { Search } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INVENTORY_CATEGORIES,
  INVENTORY_STATUS_OPTIONS,
} from "@/data/inventory";

export function InventoryFiltersCard({
  filters,
  hasActiveFilters,
  onQueryChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}) {
  return (
      <Card className=" w-full bg-background shadow-xl ">
          <CardHeader className="gap-2 lg:flex-row lg:items-end lg:justify-between ">
              <CardTitle className="text-xl tracking-wider">快速篩選</CardTitle>
              <CardDescription className="text-base tracking-widestpro">
                  依名稱、分類與庫存狀態縮小清單範圍。
              </CardDescription>

              {hasActiveFilters ? (
                  <Button variant="outline" onClick={onReset}>
                      清除篩選
                  </Button>
              ) : null}
          </CardHeader>
          <CardContent className="grid gap-3 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
              <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                      className="pl-9"
                      placeholder="搜尋名稱或備註"
                      value={filters.query}
                      onChange={(event) => onQueryChange(event.target.value)}
                  />
              </div>
              <Select value={filters.category} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="全部分類" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="全部">全部分類</SelectItem>
                      {INVENTORY_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                              {category}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={onStatusChange}>
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="全部狀態" />
                  </SelectTrigger>
                  <SelectContent>
                      {INVENTORY_STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                              {status === "全部" ? "全部狀態" : status}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </CardContent>
      </Card>
  );
}
