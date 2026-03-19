import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InventoryFormField } from "@/components/InventoryFormField";
import { INVENTORY_CATEGORIES } from "@/data/inventory";

export function InventoryFormDialog({
  open,
  onOpenChange,
  formMode,
  draft,
  errors,
  onDraftChange,
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{formMode === "create" ? "新增庫存項目" : "編輯庫存項目"}</DialogTitle>
          <DialogDescription>
            管理單位、標準存量與補貨門檻，讓庫存提醒更準確。
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <InventoryFormField id="inventory-name" label="項目名稱" error={errors.name}>
              <Input
                id="inventory-name"
                value={draft.name}
                onChange={(event) => onDraftChange("name", event.target.value)}
              />
            </InventoryFormField>
            <InventoryFormField
              id="inventory-category"
              label="分類"
              error={errors.category}>
              <Select
                value={draft.category}
                onValueChange={(value) => onDraftChange("category", value)}>
                <SelectTrigger className="w-full" id="inventory-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVENTORY_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InventoryFormField>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InventoryFormField id="inventory-unit" label="單位" error={errors.unit}>
              <Input
                id="inventory-unit"
                placeholder="例如：公斤、盒、包"
                value={draft.unit}
                onChange={(event) => onDraftChange("unit", event.target.value)}
              />
            </InventoryFormField>
            <InventoryFormField
              id="inventory-current-stock"
              label="現有庫存"
              error={errors.currentStock}>
              <Input
                id="inventory-current-stock"
                inputMode="numeric"
                value={draft.currentStock}
                onChange={(event) => onDraftChange("currentStock", event.target.value)}
              />
            </InventoryFormField>
            <InventoryFormField
              id="inventory-par-level"
              label="標準存量"
              error={errors.parLevel}>
              <Input
                id="inventory-par-level"
                inputMode="numeric"
                value={draft.parLevel}
                onChange={(event) => onDraftChange("parLevel", event.target.value)}
              />
            </InventoryFormField>
          </div>

          <InventoryFormField
            id="inventory-reorder-threshold"
            label="補貨門檻"
            error={errors.reorderThreshold}>
            <Input
              id="inventory-reorder-threshold"
              inputMode="numeric"
              value={draft.reorderThreshold}
              onChange={(event) => onDraftChange("reorderThreshold", event.target.value)}
            />
          </InventoryFormField>

          <InventoryFormField id="inventory-notes" label="備註" error={errors.notes}>
            <Textarea
              id="inventory-notes"
              placeholder="補貨頻率、保存條件、供應商提醒等"
              value={draft.notes}
              onChange={(event) => onDraftChange("notes", event.target.value)}
            />
          </InventoryFormField>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>
              取消
            </DialogClose>
            <Button type="submit">{formMode === "create" ? "儲存項目" : "更新項目"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
