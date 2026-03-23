import { useDeferredValue, useState } from "react";
import { useSearchParams } from "react-router";

import { getDefaultConfig } from "@/data/items";
import CustomerCategoryTabs from "@/features/customer/components/CustomerCategoryTabs";
import CustomerCartPanel from "@/features/customer/components/CustomerCartPanel";
import DrinkCustomizerDialog from "@/features/customer/components/DrinkCustomizerDialog";
import CustomerMenuHeader from "@/features/customer/components/CustomerMenuHeader";
import CustomerMenuSectionList from "@/features/customer/components/CustomerMenuSectionList";
import CustomerMobileCheckoutBar from "@/features/customer/components/CustomerMobileCheckoutBar";
import {
  customerCategories,
  getCustomerMenuSections,
  normalizeCustomerCategoryId,
} from "@/features/customer/data/customerCatalog";
import { useCustomerOutlet } from "@/features/customer/hooks/useCustomerOutlet";

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

  // get params from url
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
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <CustomerMenuHeader
        onClearFilters={clearFilters}
        onSearchTermChange={setSearchTerm}
        resultCount={resultCount}
        searchTerm={searchTerm}
      />
      <CustomerCategoryTabs
        categories={customerCategories}
        onCategoryChange={updateCategory}
        selectedCategoryId={selectedCategoryId}
      />

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_30rem]">
        <section className="space-y-4">
          <CustomerMenuSectionList
            onClearFilters={clearFilters}
            onSelectItem={handleOpenItem}
            sections={menuSections}
          />
        </section>

        <aside className="xl:sticky xl:top-20 xl:self-start" id="cart">
          <CustomerCartPanel
            checkoutHref="/customer/checkout"
            itemCount={itemCount}
            lines={lines}
            onClearCart={clearCart}
            onRemoveLine={removeLine}
            onUpdateQuantity={updateQuantity}
            subtotal={subtotal}
          />
        </aside>
      </div>

      <CustomerMobileCheckoutBar
        checkoutHref="/customer/checkout"
        itemCount={itemCount}
        subtotal={subtotal}
      />

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
