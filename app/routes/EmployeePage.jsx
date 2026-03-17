import { Button } from "@/components/ui/button";
import {
    CircleAlert,
    Package,
    Pencil,
    PencilLine,
    Plus,
    Search,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserPlus } from "lucide-react";

export default function EmployeePage() {
    return (
        <>
            <section className="min-h-full  my-8">
                {/*  TOP : Header  */}
                <div className="flex flex-col p-4 mx-4 bg-linear-to-rshadow-lg lg:flex-row lg:items-end lg:justify-between  bg-white shadow-sm ring-1 ring-slate-200">
                    {/* <p className="tracking-[0.2em] uppercase">Employee Management</p> */}
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold tracking-widest">員工管理</h1>
                        <p className="max-w-2xl tracking-[0.2em]">新增、刪除或停用員工帳號。</p>
                    </div>
                    <Button variant="outline" className="p-6 text-base">
                        <UserPlus className="mr-2 size-5 stroke-2 " />
                        新增員工
                    </Button>
                </div>
            </section>

            <section className="min-h-full  my-8 ">
                <Card className="py-6 mx-4 rounded-xs border-0 bg-white shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="">
                            <CardTitle className="mb-2 tracking-widest text-2xl font-semibold">
                                篩選
                            </CardTitle>
                            <CardDescription className="max-w-xl  space-y-2 tracking-[0.2em] text-base">
                                依名字、職位與帳戶狀態篩選列表。
                            </CardDescription>
                        </div>
                        {/* hasActiveFilters */}
                        {/* onClick={} resetFilters */}
                    </CardHeader>
                    <CardContent className="grid gap-3 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
                        <div className="relative">
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground " />

                            <Input
                                className="rounded-md pl-9 md:text-base"
                                placeholder="輸入搜尋員工編號 或 名字"
                                // value={filters.query}
                                // onChange={(event) =>
                                //     setFilters((currentFilters) => ({
                                //         ...currentFilters,
                                //         query: event.target.value,
                                //     }))
                                // }
                            />
                        </div>

                        <Select
                        // value={filters.category}
                        // onValueChange={(value) =>
                        //     setFilters((currentFilters) => ({
                        //         ...currentFilters,
                        //         category: value,
                        //     }))
                        // }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="全部" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectItem value="manager">經理</SelectItem>
                                <SelectItem value="normal">普通員工</SelectItem>
                                {/* {INVENTORY_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))} */}
                            </SelectContent>
                        </Select>
                        <Select
                        // value={filters.status}
                        // onValueChange={(value) =>
                        //     setFilters((currentFilters) => ({
                        //         ...currentFilters,
                        //         status: value,
                        //     }))
                        // }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="帳號狀態" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="enable">啟用</SelectItem>
                                <SelectItem value="disable">停用</SelectItem>

                                {/* {INVENTORY_STATUS_OPTIONS.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status === "all" ? "全部狀態" : status}
                                    </SelectItem>
                                ))} */}
                            </SelectContent>
                        </Select>
                        {1 === 1 ? (
                            <Button className="col-span-3 p-6 text-base" variant="outline">
                                清除篩選
                            </Button>
                        ) : null}
                    </CardContent>
                </Card>
            </section>
            <section className="min-h-full  my-8">
                <Card className="p-6 mx-4 rounded-xs border-0 bg-white shadow-sm ring-1 ring-slate-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>員工編號</TableHead>
                                <TableHead>員工名字</TableHead>
                                <TableHead>登入名稱</TableHead>
                                <TableHead>職位</TableHead>
                                <TableHead>帳戶狀態</TableHead>
                                <TableHead>最新修改時間</TableHead>

                                <TableHead className="text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>14052</TableCell>
                                <TableCell className="">何榮基</TableCell>
                                <TableCell className="">abvc1234</TableCell>
                                <TableCell className="">普通員工</TableCell>
                                <TableCell>生存</TableCell>
                                <TableCell className="">1900-0-0 12:00</TableCell>
                                <TableCell className="flex justify-end gap-1">
                                    <Button>
                                        <PencilLine className="size-4 " />
                                        修改
                                    </Button>
                                    <Button>
                                        <Trash2 className="size-4 " />
                                        刪除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </section>
        </>
    );
}
