import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { InventoryFormField } from "@/components/InventoryFormField";
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/data/staff";
import { createStaffItem, loadStaffItems } from "@/features/staff/data/staffRepository";
import { createEmptyStaffDraft, validateStaffDraft } from "@/features/staff/utils/staffHelpers";

export default function EmployeeCreatePage() {
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
      <PageHeader
        title="新增員工"
        desc="建立新的員工登入帳號，完成後可直接用於示範登入。"
      />

      <Card className="mt-4 border-0 bg-white py-6 shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl">員工資料</CardTitle>
          <CardDescription className="text-base">
            請輸入基本資料、登入名稱與帳戶狀態。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <InventoryFormField id="staff-id" label="員工編號" error={errors.id}>
                <Input
                  id="staff-id"
                  value={draft.id}
                  onChange={(event) => handleDraftChange("id", event.target.value)}
                />
              </InventoryFormField>
              <InventoryFormField id="staff-name" label="員工名字" error={errors.name}>
                <Input
                  id="staff-name"
                  value={draft.name}
                  onChange={(event) => handleDraftChange("name", event.target.value)}
                />
              </InventoryFormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InventoryFormField
                id="staff-login-name"
                label="登入名稱"
                error={errors.loginName}>
                <Input
                  id="staff-login-name"
                  value={draft.loginName}
                  onChange={(event) => handleDraftChange("loginName", event.target.value)}
                />
              </InventoryFormField>
              <InventoryFormField id="staff-password" label="登入密碼" error={errors.password}>
                <Input
                  id="staff-password"
                  type="password"
                  value={draft.password}
                  onChange={(event) => handleDraftChange("password", event.target.value)}
                />
              </InventoryFormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="staff-role">職位</Label>
                <Select
                  value={draft.role}
                  onValueChange={(value) => handleDraftChange("role", value)}>
                  <SelectTrigger className="w-full" id="staff-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAFF_ROLE_OPTIONS.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-status">帳戶狀態</Label>
                <Select
                  value={draft.status}
                  onValueChange={(value) => handleDraftChange("status", value)}>
                  <SelectTrigger className="w-full" id="staff-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAFF_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">建立員工</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/employee")}>
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
