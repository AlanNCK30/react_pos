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
import { PopupFeedback } from "@/features/staff/components/PopupFeedback";

export function StaffStatusDialog({ state, onOpenChange, onConfirm }) {
    return (
        <Dialog open={state.open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md tracking-widestpro">
                <DialogHeader className="">
                    <DialogTitle className="text-xl">
                        {state.feedback
                            ? state.feedback.type === "success"
                                ? "帳號狀態已更新"
                                : "無法更新帳號狀態"
                            : state.staff?.status === "停用"
                              ? "啟用帳號"
                              : "停用帳號"}
                    </DialogTitle>
                    <DialogDescription className="text-base ">
                        {state.feedback
                            ? "確認結果後關閉視窗。"
                            : state.staff
                              ? `確定要${
                                    state.staff.status === "停用" ? "啟用" : "停用"
                                } ${state.staff.name} 的帳號嗎？`
                              : "請確認帳號狀態操作。"}
                    </DialogDescription>
                </DialogHeader>

                <PopupFeedback feedback={state.feedback} />

                <DialogFooter>
                    <DialogClose
                        render={<Button className="text-lg " variant="outline" type="button" />}
                    >
                        {state.feedback ? "關閉" : "取消"}
                    </DialogClose>
                    {!state.feedback ? (
                        <Button
                            className="text-lg "
                            variant={state.staff?.status === "停用" ? "outline" : "destructive"}
                            onClick={onConfirm}
                        >
                            {state.staff?.status === "停用" ? "確認" : "確認"}
                        </Button>
                    ) : null}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
