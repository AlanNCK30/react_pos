import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/data/staff";

function StaffFormField({ id, label, error, children }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
    );
}

export function StaffFormFields({ draft, errors, onFieldChange, disableId = false }) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <StaffFormField id="staff-id" label="員工編號" error={errors.id}>
                    <Input
                        id="staff-id"
                        value={draft.id}
                        disabled={disableId}
                        onChange={(event) => onFieldChange("id", event.target.value)}
                    />
                </StaffFormField>
                <StaffFormField id="staff-name" label="員工名字" error={errors.name}>
                    <Input
                        id="staff-name"
                        value={draft.name}
                        onChange={(event) => onFieldChange("name", event.target.value)}
                    />
                </StaffFormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <StaffFormField id="staff-login-name" label="登入名稱" error={errors.loginName}>
                    <Input
                        id="staff-login-name"
                        value={draft.loginName}
                        onChange={(event) => onFieldChange("loginName", event.target.value)}
                    />
                </StaffFormField>
                <StaffFormField id="staff-password" label="登入密碼" error={errors.password}>
                    <Input
                        id="staff-password"
                        type="password"
                        value={draft.password}
                        onChange={(event) => onFieldChange("password", event.target.value)}
                    />
                </StaffFormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="staff-role">職位</Label>
                    <Select
                        value={draft.role}
                        onValueChange={(value) => onFieldChange("role", value)}
                    >
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
                        onValueChange={(value) => onFieldChange("status", value)}
                    >
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
        </>
    );
}
