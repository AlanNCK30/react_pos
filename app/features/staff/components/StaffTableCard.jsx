import { PencilLine, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getProtectedStaffMessage, isOwnerStaff } from "@/features/staff/utils/staffHelpers";
import { formatDateTime } from "@/utils/formatters";

export function StaffTableCard({ staffItems, onEdit, onStatusChange }) {
    return (
        <Card className="my-2 rounded-xl border-0 bg-secondary px-4 py-2 shadow-sm ring-1">
            <Table>
                <TableHeader>
                    <TableRow className="text-base text-primary">
                        <TableHead>編號</TableHead>
                        <TableHead>名字</TableHead>
                        <TableHead>登入名稱</TableHead>
                        <TableHead>職位</TableHead>
                        <TableHead>帳戶狀態</TableHead>
                        <TableHead>最新修改時間</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {staffItems.map((staff) => {
                        const ownerProtected = isOwnerStaff(staff);
                        const protectedMessage = getProtectedStaffMessage(staff);

                        return (
                            <TableRow key={staff.id} className="text-base text-primary/95">
                                <TableCell>{staff.id}</TableCell>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.loginName}</TableCell>
                                <TableCell>{staff.role}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <p>{staff.status}</p>
                                        {ownerProtected ? (
                                            <p className="text-xs text-amber-700">
                                                {protectedMessage}
                                            </p>
                                        ) : null}
                                    </div>
                                </TableCell>
                                <TableCell>{formatDateTime(staff.updatedAt)}</TableCell>
                                <TableCell className="flex justify-end gap-1">
                                    <Button
                                        className="bg-primary/60 text-foreground/90 hover:bg-primary/90 hover:text-foreground"
                                        onClick={() => onEdit(staff)}
                                    >
                                        <PencilLine className="size-4" />
                                        修改
                                    </Button>
                                    <Button
                                        className="text-foreground/90 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        variant={
                                            staff.status === "停用" ? "outline" : "destructive"
                                        }
                                        disabled={ownerProtected}
                                        onClick={() => onStatusChange(staff)}
                                    >
                                        {staff.status === "停用" ? (
                                            <RotateCcw className="size-4" />
                                        ) : (
                                            <Trash2 className="size-4" />
                                        )}
                                        {staff.status === "停用" ? "啟用" : "停用"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    );
}
