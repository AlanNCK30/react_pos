import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

import { HeaderButton } from "@/components/HeaderButton";
import { PageHeader } from "@/components/PageHeader";
import { StaffEditDialog } from "@/features/staff/components/StaffEditDialog";
import { StaffFiltersCard } from "@/features/staff/components/StaffFiltersCard";
import { StaffStatusDialog } from "@/features/staff/components/StaffStatusDialog";
import { StaffTableCard } from "@/features/staff/components/StaffTableCard";
import { useStaffManagement } from "@/features/staff/hooks/useStaffManagement";

export function StaffManagementFeature() {
    const navigate = useNavigate();
    const staff = useStaffManagement();

    return (
        <div className="mt-2 flex min-h-80vh w-full flex-col px-2">
            <PageHeader
                title="員工管理"
                desc="新增、檢視與管理員工登入帳號。"
                actionBtn={
                    <HeaderButton
                        icon={Plus}
                        text="新增員工"
                        action={() => navigate("/employee/new")}
                    />
                }
            />

            <StaffFiltersCard
                filters={staff.filters}
                hasActiveFilters={staff.hasActiveFilters}
                onFilterChange={staff.handleFilterChange}
                onReset={staff.resetFilters}
            />

            <StaffTableCard
                staffItems={staff.filteredStaffItems}
                onEdit={staff.handleEditOpen}
                onStatusChange={staff.handleStatusDialogOpen}
            />

            <StaffEditDialog
                open={staff.editDialogOpen}
                draft={staff.editDraft}
                errors={staff.editErrors}
                feedback={staff.editFeedback}
                onOpenChange={staff.handleEditDialogChange}
                onFieldChange={staff.handleEditDraftChange}
                onSubmit={staff.handleEditSubmit}
            />

            <StaffStatusDialog
                state={staff.statusDialogState}
                onOpenChange={staff.handleStatusDialogChange}
                onConfirm={staff.handleToggleStaffStatus}
            />
        </div>
    );
}
