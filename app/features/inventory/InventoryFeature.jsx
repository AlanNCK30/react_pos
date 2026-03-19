import { Plus } from "lucide-react";

import { HeaderButton } from "@/components/HeaderButton";
import { PageHeader } from "@/components/PageHeader";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import { InventoryDeleteDialog } from "@/features/inventory/components/InventoryDeleteDialog";
import { InventoryFiltersCard } from "@/features/inventory/components/InventoryFiltersCard";
import { InventoryFormDialog } from "@/features/inventory/components/InventoryFormDialog";
import { InventoryStatusAlert } from "@/features/inventory/components/InventoryStatusAlert";
import { InventoryTableCard } from "@/features/inventory/components/InventoryTableCard";

export function InventoryFeature() {
  const inventory = useInventory();

  return (
    <div className="min-h-[80vh] bg-slate-100/70 px-2 py-2 text-primary">
      <PageHeader
        title="庫存管理"
        desc="檢視原料、配料、杯具與包裝材料，提醒需要處理的異常庫存項目。"
        actionBtn={
          <HeaderButton
            icon={Plus}
            text="新增庫存項目"
            action={inventory.handleCreateOpen}
          />
        }
      />

      <div className="mx-auto mt-2 flex w-full max-w-7xl flex-col gap-6">
        <InventoryFiltersCard
          filters={inventory.filters}
          hasActiveFilters={inventory.hasActiveFilters}
          onQueryChange={inventory.handleQueryChange}
          onCategoryChange={inventory.handleCategoryChange}
          onStatusChange={inventory.handleStatusChange}
          onReset={inventory.resetFilters}
        />
        <InventoryStatusAlert lowStockItems={inventory.lowStockItems} />
        <InventoryTableCard
          items={inventory.items}
          filteredItems={inventory.filteredItems}
          onCreate={inventory.handleCreateOpen}
          onResetFilters={inventory.resetFilters}
          onEdit={inventory.handleEditOpen}
          onDelete={inventory.setDeleteTarget}
        />
      </div>

      <InventoryFormDialog
        open={inventory.formOpen}
        onOpenChange={inventory.handleFormOpenChange}
        formMode={inventory.formMode}
        draft={inventory.draft}
        errors={inventory.errors}
        onDraftChange={inventory.handleDraftChange}
        onSubmit={inventory.handleSubmit}
      />

      <InventoryDeleteDialog
        deleteTarget={inventory.deleteTarget}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            inventory.clearDeleteTarget();
          }
        }}
        onConfirm={inventory.handleDeleteConfirm}
      />
    </div>
  );
}
