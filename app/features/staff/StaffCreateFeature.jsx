import { useState } from "react";
import { useNavigate } from "react-router";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createStaffItem, loadStaffItems } from "@/features/staff/data/staffRepository";
import { StaffFormFields } from "@/features/staff/components/StaffFormFields";
import { createEmptyStaffDraft, validateStaffDraft } from "@/features/staff/utils/staffHelpers";

export function StaffCreateFeature() {
    const navigate = useNavigate();
    const [draft, setDraft] = useState(createEmptyStaffDraft());
    const [errors, setErrors] = useState({});

    function handleDraftChange(field, value) {
        setDraft((currentDraft) => ({
            ...currentDraft,
            [field]: value,
        }));

        setErrors((currentErrors) => {
            if (!currentErrors[field]) {
                return currentErrors;
            }

            const nextErrors = { ...currentErrors };
            delete nextErrors[field];
            return nextErrors;
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const { errors: nextErrors, values } = validateStaffDraft(draft, loadStaffItems());

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        createStaffItem({
            ...values,
            updatedAt: new Date().toISOString(),
        });

        navigate("/employee");
    }

    return (
        <div className="min-h-[80vh] px-2 py-2">
            <PageHeader title="新增員工" desc="建立新的員工登入帳號，完成後可直接用於示範登入。" />

            <Card className="mt-4 border-0 bg-white py-6 shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                    <CardTitle className="text-2xl">員工資料</CardTitle>
                    <CardDescription className="text-base">
                        請輸入基本資料、登入名稱與帳戶狀態。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-5" onSubmit={handleSubmit}>
                        <StaffFormFields
                            draft={draft}
                            errors={errors}
                            onFieldChange={handleDraftChange}
                        />

                        <div className="flex gap-3 pt-2">
                            <Button type="submit">建立員工</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/employee")}
                            >
                                取消
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
