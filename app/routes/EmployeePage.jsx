import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { PencilLine, Plus, Search, Trash2 } from "lucide-react";

import { HeaderButton } from "@/components/HeaderButton";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/data/staff";
import { loadStaffItems } from "@/features/staff/data/staffRepository";
import {
  DEFAULT_STAFF_FILTERS,
  filterStaffItems,
  hasActiveStaffFilters,
} from "@/features/staff/utils/staffHelpers";
import { formatDateTime } from "@/utils/formatters";

export default function EmployeePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(DEFAULT_STAFF_FILTERS);
  const staffItems = loadStaffItems();
  const filteredStaffItems = useMemo(
    () => filterStaffItems(staffItems, filters),
    [staffItems, filters]
  );
  const hasActiveFilters = hasActiveStaffFilters(filters);

  function resetFilters() {
    setFilters(DEFAULT_STAFF_FILTERS);
  }

  return (
    <div className="mt-2 flex min-h-[calc(100vh-5rem)] w-full flex-col px-2">
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

      <Card className="mt-2 rounded-xl border bg-white px-2 py-4 shadow-sm ring">
        <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CardTitle className="mb-2 text-2xl font-semibold tracking-widest">篩選</CardTitle>
            <CardDescription className="max-w-xl text-base tracking-widestpro">
              依名字、職位與帳戶狀態篩選列表。
            </CardDescription>
          </div>
          {hasActiveFilters ? (
            <Button variant="outline" onClick={resetFilters}>
              清除篩選
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="rounded-xs pl-9 md:text-base"
              placeholder="輸入員工編號、名字或登入名稱"
              value={filters.query}
              onChange={(event) =>
                setFilters((currentFilters) => ({
                  ...currentFilters,
                  query: event.target.value,
                }))
              }
            />
          </div>

          <Select
            value={filters.role}
            onValueChange={(value) =>
              setFilters((currentFilters) => ({
                ...currentFilters,
                role: value,
              }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="全部職位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="全部">全部職位</SelectItem>
              {STAFF_ROLE_OPTIONS.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((currentFilters) => ({
                ...currentFilters,
                status: value,
              }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="帳號狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="全部">全部狀態</SelectItem>
              {STAFF_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="my-2 rounded-xl border-0 bg-secondary px-4 py-2 shadow-sm ring-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary">編號</TableHead>
              <TableHead className="text-primary">名字</TableHead>
              <TableHead className="text-primary">登入名稱</TableHead>
              <TableHead className="text-primary">職位</TableHead>
              <TableHead className="text-primary">帳戶狀態</TableHead>
              <TableHead className="text-primary">最新修改時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredStaffItems.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.loginName}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.status}</TableCell>
                <TableCell>{formatDateTime(staff.updatedAt)}</TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    className="bg-primary/60 text-foreground/90 hover:bg-primary/90 hover:text-foreground">
                    <PencilLine className="size-4" />
                    修改
                  </Button>
                  <Button className="bg-destructive/65 text-foreground/90 hover:bg-destructive hover:text-foreground">
                    <Trash2 className="size-4" />
                    停用
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
