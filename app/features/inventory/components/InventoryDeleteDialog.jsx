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

export function InventoryDeleteDialog({
  deleteTarget,
  onOpenChange,
  onConfirm,
}) {
  return (
    <Dialog open={Boolean(deleteTarget)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>刪除庫存項目</DialogTitle>
          <DialogDescription>
            這個操作會永久移除該項目，且會同步更新本機庫存資料。
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
          {deleteTarget ? (
            <p>
              確定要刪除 <span className="font-semibold">{deleteTarget.name}</span> 嗎？
            </p>
          ) : null}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>
            取消
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            確認刪除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
