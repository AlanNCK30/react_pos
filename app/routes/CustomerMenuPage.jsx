import { startTransition, useDeferredValue, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDefaultConfig } from "@/data/items";
import CustomerCartPanel from "@/features/customer/components/CustomerCartPanel";
import DrinkCustomizerDialog from "@/features/customer/components/DrinkCustomizerDialog";
import {
  customerCategories,
  getCustomerMenuSections,
  normalizeCustomerCategoryId,
} from "@/features/customer/data/customerCatalog";
import { useCustomerOutlet } from "@/features/customer/hooks/useCustomerOutlet";
import { formatCurrency } from "@/utils/formatters";

export default function CustomerMenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [activeItem, setActiveItem] = useState(null);
  const [draftConfig, setDraftConfig] = useState(null);
  const { addLine, clearCart, itemCount, lines, removeLine, subtotal, updateQuantity } =
    useCustomerOutlet();

  const selectedCategoryId = normalizeCustomerCategoryId(searchParams.get("category"));
  const menuSections = getCustomerMenuSections(selectedCategoryId, deferredSearchTerm);
  const resultCount = menuSections.reduce((sum, section) => sum + section.items.length, 0);

  function updateCategory(nextCategoryId) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (!nextCategoryId || nextCategoryId === "all") {
      nextSearchParams.delete("category");
    } else {
      nextSearchParams.set("category", nextCategoryId);
    }

    setSearchParams(nextSearchParams, { replace: true });
  }

  function clearFilters() {
    setSearchTerm("");
    updateCategory("all");
  }

  function handleOpenItem(item) {
    setActiveItem(item);
    setDraftConfig(getDefaultConfig(item.opt_group_id));
  }

  function handleCloseDialog() {
    setActiveItem(null);
    setDraftConfig(null);
  }

  function handleAddToCart() {
    addLine(activeItem, draftConfig);
    handleCloseDialog();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
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
                onChange={(event) => {
                  const nextValue = event.target.value;
                  startTransition(() => {
                    setSearchTerm(nextValue);
                  });
                }}
                placeholder="搜尋飲品名稱或編號"
                value={searchTerm}
              />
            </div>
            <Button className="rounded-lg" onClick={clearFilters} type="button" variant="outline">
              清除
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`rounded-lg px-3 py-2 text-md font-medium transition-colors ${
              selectedCategoryId === "all"
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => updateCategory("all")}
            type="button"
          >
            全部
          </button>
          {customerCategories.map((category) => (
            <button
              key={category.id}
              className={`rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                selectedCategoryId === category.id
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              onClick={() => updateCategory(category.id)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-md text-slate-500">顯示 {resultCount} 款物品</p>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="space-y-4">
          {menuSections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center">
              <p className="text-base font-semibold text-slate-950">找不到符合條件的飲品</p>

              <div className="mt-5 flex justify-center gap-3">
                <Button className="rounded-lg" onClick={clearFilters} type="button">
                  清除條件
                </Button>
              </div>
            </div>
          ) : (
            menuSections.map((section) => (
              <section
                key={section.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
                  <h2 className="text-xl font-semibold text-slate-950">{section.name}</h2>
                  <p className="mt-1 text-md text-slate-500">{section.description}</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-5"
                    >
                      <img
                        alt={item.name}
                        className="size-14 shrink-0 rounded-lg object-cover sm:size-16"
                        loading="lazy"
                        src={item.image}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
                        </div>
                      </div>

                      <div className="ml-auto flex shrink-0 flex-col items-end gap-3">
                        <div className="text-right text-md leading-6 text-slate-600">
                          <p>M {formatCurrency(item.medium)}</p>
                          <p>L {formatCurrency(item.large)}</p>
                        </div>
                        <Button
                          className="rounded-lg"
                          onClick={() => handleOpenItem(item)}
                          type="button"
                        >
                          選擇
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </section>

        <aside className="xl:sticky xl:top-20 xl:self-start" id="cart">
          <CustomerCartPanel
            itemCount={itemCount}
            lines={lines}
            onClearCart={clearCart}
            onRemoveLine={removeLine}
            onUpdateQuantity={updateQuantity}
            subtotal={subtotal}
          />
        </aside>
      </div>

      {itemCount > 0 ? (
        <a
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3 text-md font-medium text-white shadow-xl xl:hidden"
          href="#cart"
        >
          <span>購物袋 {itemCount} 件</span>
          <span>{formatCurrency(subtotal)}</span>
        </a>
      ) : null}

      <DrinkCustomizerDialog
        config={draftConfig}
        item={activeItem}
        onAddToCart={handleAddToCart}
        onClose={handleCloseDialog}
        onConfigChange={setDraftConfig}
        open={Boolean(activeItem && draftConfig)}
      />
    </main>
  );
}
