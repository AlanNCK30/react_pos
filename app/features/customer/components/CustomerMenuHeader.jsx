import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CustomerMenuHeader({
  onClearFilters,
  onSearchTermChange,
  resultCount,
  searchTerm,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">菜單</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 rounded-lg border-slate-200 pl-10"
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="搜尋飲品名稱"
              value={searchTerm}
            />
          </div>
          <Button className="rounded-lg" onClick={onClearFilters} type="button" variant="outline">
            清除
          </Button>
        </div>
      </div>

      <p className="mt-4 text-md text-slate-500">顯示 {resultCount} 款物品</p>
    </section>
  );
}
