import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";

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
import { PageHeader } from "@/components/PageHeader";
import { HeaderButton } from "@/components/HeaderButton";


export default function EmployeePage() {
    const [darkMode, setDarkMode] = useState(() => {
        return (
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col inset-0 px-2 mt-2 w-full">
            <PageHeader
                title={"員工管理"}
                desc={"新增、刪除或停用員工帳號。"}
                actionBtn={
                    <HeaderButton
                        icon={Plus}
                        text={"新增員工"}
                        action={() => setDarkMode(!darkMode)}
                    />
                }
            />
            <Card className="mt-2 py-4 px-2 rounded-xl border shadow-sm ring">
                <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="">
                        <CardTitle className="mb-2 tracking-widest text-2xl font-semibold">
                            篩選
                        </CardTitle>
                        <CardDescription className="max-w-xl  space-y-2 tracking-widestpro text-base">
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
                            className="rounded-xs pl-9 md:text-base"
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
                            <SelectItem value="經理">經理</SelectItem>
                            <SelectItem value="普通員工">普通員工</SelectItem>
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
                            <SelectItem value="啟用">啟用</SelectItem>
                            <SelectItem value="停用">停用</SelectItem>
                            {/* 
                            {INVENTORY_STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status === "all" ? "全部狀態" : status}
                                </SelectItem>
                            ))} */}
                        </SelectContent>
                    </Select>

                    <Button
                        className="col-span-3 p-6 text-base ring/90 visible tracking-widestpro bg-accent-foreground/80 dark:bg-primary/80 text-accent"
                        variant="outline"
                    >
                        清除篩選
                    </Button>
                </CardContent>
            </Card>

            <Card className="px-4 py-2 my-2 rounded-xl border-0 shadow-sm ring-1 bg-secondary">
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
                        <TableRow>
                            <TableCell>14052</TableCell>
                            <TableCell className="">何榮基</TableCell>
                            <TableCell className="">abvc1234</TableCell>
                            <TableCell className="">普通員工</TableCell>
                            <TableCell>綠燈/紅燈/灰燈</TableCell>
                            <TableCell className="">1900-0-0 12:00</TableCell>
                            <TableCell className="flex justify-end gap-1">
                                <Button
                                    className="bg-primary/60 hover:bg-primary/90
                                text-foreground/90 hover:text-foreground"
                                >
                                    <PencilLine className="size-4" />
                                    修改
                                </Button>
                                <Button className="bg-destructive/65 hover:bg-destructive text-foreground/90 hover:text-foreground">
                                    <Trash2 className="size-4" />
                                    停用
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
