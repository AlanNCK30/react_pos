import { Search } from "lucide-react";

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
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/data/staff";

export function StaffFiltersCard({
  filters,
  hasActiveFilters,
  onFilterChange,
  onReset,
}) {
  return (
    <Card className='mt-2 rounded-xl border bg-white px-2 py-4 shadow-sm ring'>
      <CardHeader className='gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <CardTitle className='mb-2 text-2xl font-semibold'>篩選</CardTitle>
          <CardDescription className='max-w-xl text-base tracking-widestpro'>
            依名字、職位與帳戶狀態篩選列表。
          </CardDescription>
        </div>
        {hasActiveFilters ? (
          <Button
            variant='outline'
            onClick={onReset}
          >
            清除篩選
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className='grid gap-3 lg:grid-cols-[1.5fr_0.8fr_0.8fr]'>
        <div className='relative'>
          <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className=' md:text-base'
            placeholder='輸入員工編號、名字或登入名稱'
            value={filters.query}
            onChange={(event) => onFilterChange('query', event.target.value)}
          />
        </div>

        <Select
          value={filters.role}
          onValueChange={(value) => onFilterChange('role', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='全部職位' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='全部'>全部職位</SelectItem>
            {STAFF_ROLE_OPTIONS.map((role) => (
              <SelectItem
                key={role}
                value={role}
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='帳號狀態' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='全部'>全部狀態</SelectItem>
            {STAFF_STATUS_OPTIONS.map((status) => (
              <SelectItem
                key={status}
                value={status}
              >
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
