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
import { StaffFormFields } from "@/features/staff/components/StaffFormFields";
import { PopupFeedback } from "@/features/staff/components/PopupFeedback";

export function StaffEditDialog({
    open,
    draft,
    errors,
    feedback,
    onOpenChange,
    onFieldChange,
    onSubmit,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="">修改員工帳戶</DialogTitle>
                    <DialogDescription>可更新員工資料、帳戶密碼及帳戶狀態。</DialogDescription>
                </DialogHeader>

                <PopupFeedback feedback={feedback} />

                <form className="grid gap-4" onSubmit={onSubmit}>
                    <StaffFormFields
                        draft={draft}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        disableId
                    />

                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" type="button" />}>
                            關閉
                        </DialogClose>
                        <Button type="submit">儲存修改</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
