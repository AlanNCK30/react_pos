import { useEffect, useState } from "react";
import { CircleAlert, Package, Pencil, Plus, Search, Trash2, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
    INVENTORY_CATEGORIES,
    INVENTORY_STATUS_OPTIONS,
    getInventoryStatus,
    loadInventoryItems,
    saveInventoryItems,
} from "@/data/inventory.js";
import { PageHeader } from "@/components/PageHeader";
import { HeaderButton } from "@/components/HeaderButton";
import {
    createDraftFromItem,
    createEmptyDraft,
    validateDraft,
} from "@/features/inventory/utils/draftHelpers.js";
import { InventoryFormField } from "@/components/InventoryFormField";
import { formatTimestamp, formatDateTime } from "@/utils/formatters";

const DEFAULT_FILTERS = {
    query: "",
    category: "全部",
    status: "全部",
};

function getStatusBadgeVariant(status) {
    if (status === "缺貨") {
        return "destructive";
    }

    if (status === "庫存偏低") {
        return "secondary";
    }

    return "outline";
}
function sortByUrgency(a, b) {
    const severityOrder = {
        缺貨: 0,
        庫存偏低: 1,
        正常: 2,
    };

    const severityDiff =
        severityOrder[getInventoryStatus(a)] - severityOrder[getInventoryStatus(b)];

    if (severityDiff !== 0) {
        return severityDiff;
    }

    return a.currentStock - b.currentStock;
}

function buildSummary(items) {
    return {
        totalItems: items.length,
        lowStockCount: items.filter((item) => getInventoryStatus(item) === "庫存偏低").length,
        outOfStockCount: items.filter((item) => getInventoryStatus(item) === "缺貨").length,
        totalUnits: items.reduce((sum, item) => sum + item.currentStock, 0),
    };
}

export default function InventoryPage() {
    const [items, setItems] = useState(() => loadInventoryItems());
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [draft, setDraft] = useState(createEmptyDraft());
    const [errors, setErrors] = useState({});
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        saveInventoryItems(items);
    }, [items]);

    const normalizedQuery = filters.query.trim().toLowerCase();
    const filteredItems = items.filter((item) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            item.name.toLowerCase().includes(normalizedQuery) ||
            item.notes.toLowerCase().includes(normalizedQuery);
        const matchesCategory = filters.category === "全部" || item.category === filters.category;
        const itemStatus = getInventoryStatus(item);
        const matchesStatus = filters.status === "全部" || itemStatus === filters.status;

        return matchesQuery && matchesCategory && matchesStatus;
    });
    const lowStockItems = items
        .filter((item) => getInventoryStatus(item) !== "正常")
        .sort(sortByUrgency);
    const summary = buildSummary(items);
    const hasActiveFilters =
        filters.query.trim().length > 0 || filters.category !== "全部" || filters.status !== "全部";

    function resetDraftState() {
        setDraft(createEmptyDraft());
        setErrors({});
    }

    function handleCreateOpen() {
        setFormMode("create");
        resetDraftState();
        setFormOpen(true);
    }

    function handleEditOpen(item) {
        setFormMode("edit");
        setDraft(createDraftFromItem(item));
        setErrors({});
        setFormOpen(true);
    }

    function handleFormOpenChange(nextOpen) {
        setFormOpen(nextOpen);

        if (!nextOpen) {
            resetDraftState();
        }
    }

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

        const { errors: nextErrors, values } = validateDraft(draft);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const nextItem = {
            id: formMode === "edit" ? draft.id : `inv-${Date.now().toString(36)}`,
            ...values,
            updatedAt: new Date().toISOString(),
        };

        if (formMode === "edit") {
            setItems((currentItems) =>
                currentItems.map((item) => (item.id === draft.id ? nextItem : item))
            );
        } else {
            setItems((currentItems) => [nextItem, ...currentItems]);
        }

        setFormOpen(false);
        resetDraftState();
    }

    function handleDeleteConfirm() {
        if (!deleteTarget) {
            return;
        }

        setItems((currentItems) => currentItems.filter((item) => item.id !== deleteTarget.id));
        setDeleteTarget(null);
    }

    function resetFilters() {
        setFilters(DEFAULT_FILTERS);
    }

    return (
        <div className="min-h-[80vh] bg-slate-100/70 px-2 py-2 text-primary">
            <PageHeader
                title={"庫存管理"}
                desc={"檢視原料、配料、杯具與包裝材料，提醒需要處理的異常庫存項目。"}
                actionBtn={
                    <HeaderButton
                        icon={Plus}
                        text={"新增庫存項目"}
                        // action={() => setDarkMode(!darkMode)}
                    />
                }
            />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 mt-2">
                {/* <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-200">
                        <CardHeader className="pb-2">
                            <CardDescription>總項目數</CardDescription>
                            <CardTitle className="text-3xl">{summary.totalItems}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="size-4" />
                            已建立所有可追蹤庫存項目
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-amber-50 shadow-sm ring-1 ring-amber-200">
                        <CardHeader className="pb-2">
                            <CardDescription>低庫存提醒</CardDescription>
                            <CardTitle className="text-3xl text-amber-700">
                                {summary.lowStockCount}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2 text-sm text-amber-700/80">
                            <TriangleAlert className="size-4" />
                            需要排程補貨的項目數量
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-rose-50 shadow-sm ring-1 ring-rose-200">
                        <CardHeader className="pb-2">
                            <CardDescription>缺貨項目</CardDescription>
                            <CardTitle className="text-3xl text-rose-700">
                                {summary.outOfStockCount}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2 text-sm text-rose-700/80">
                            <CircleAlert className="size-4" />
                            已低於可銷售安全水位
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-200">
                        <CardHeader className="pb-2">
                            <CardDescription>現有庫存總量</CardDescription>
                            <CardTitle className="text-3xl">{summary.totalUnits}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            以各自單位累計的現存數量
                        </CardContent>
                    </Card>
                </div> */}

                <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <CardTitle>快速篩選</CardTitle>
                            <CardDescription>依名稱、分類與庫存狀態縮小清單範圍。</CardDescription>
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
                                className="pl-9"
                                placeholder="搜尋名稱或備註"
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
                            value={filters.category}
                            onValueChange={(value) =>
                                setFilters((currentFilters) => ({
                                    ...currentFilters,
                                    category: value,
                                }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="全部分類" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">全部分類</SelectItem>
                                {INVENTORY_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
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
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="全部狀態" />
                            </SelectTrigger>
                            <SelectContent>
                                {INVENTORY_STATUS_OPTIONS.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status === "all" ? "全部狀態" : status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {lowStockItems.length > 0 ? (
                    <Alert
                        variant="destructive"
                        className="border-rose-200 bg-rose-50 text-rose-900"
                    >
                        <TriangleAlert className="size-4" />
                        <AlertTitle>低庫存警示</AlertTitle>
                        <AlertDescription className="space-y-2 text-rose-900/80">
                            <p>
                                目前共有 {lowStockItems.length}{" "}
                                個項目需要補貨或已缺貨，請優先處理下列項目。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {lowStockItems.slice(0, 5).map((item) => (
                                    <Badge
                                        key={item.id}
                                        variant={
                                            getInventoryStatus(item) === "缺貨"
                                                ? "destructive"
                                                : "secondary"
                                        }
                                        className="rounded-full"
                                    >
                                        {item.name} · {item.currentStock}
                                        {item.unit}
                                    </Badge>
                                ))}
                            </div>
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                        <Package className="size-4" />
                        <AlertTitle>庫存狀態正常</AlertTitle>
                        <AlertDescription className="text-emerald-900/80">
                            目前沒有項目低於補貨門檻，可以維持現有採購節奏。
                        </AlertDescription>
                    </Alert>
                )}

                <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="gap-2 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <CardTitle>庫存清單</CardTitle>
                            <CardDescription>
                                顯示 {filteredItems.length} / {items.length} 項目
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
                                <Package className="mb-4 size-10 text-muted-foreground" />
                                <h2 className="text-xl font-semibold text-primary">
                                    {items.length === 0
                                        ? "尚未建立任何庫存項目"
                                        : "找不到符合條件的項目"}
                                </h2>
                                <p className="mt-2 max-w-md text-base text-muted-foreground tracking-widest ">
                                    {items.length === 0
                                        ? "新增第一筆庫存資料後，即可開始追蹤補貨門檻與盤點狀態。"
                                        : "請調整搜尋字詞或篩選條件，查看其他庫存項目。"}
                                </p>
                                <div className="mt-5 flex gap-3">
                                    {items.length === 0 ? (
                                        <HeaderButton
                                            icon={Plus}
                                            text={"新增第一筆資料"}
                                            action={handleCreateOpen}
                                        ></HeaderButton>
                                    ) : (
                                        <HeaderButton
                                            text={"清除篩選"}
                                            action={resetFilters}
                                        ></HeaderButton>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>項目</TableHead>
                                        <TableHead>分類</TableHead>
                                        <TableHead>現有庫存</TableHead>
                                        <TableHead>標準存量</TableHead>
                                        <TableHead>補貨門檻</TableHead>
                                        <TableHead>狀態</TableHead>
                                        <TableHead>最後更新</TableHead>
                                        <TableHead className="text-right">操作</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredItems.map((item) => {
                                        const status = getInventoryStatus(item);

                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell className="min-w-52 whitespace-normal">
                                                    <div className="space-y-1">
                                                        <p className="font-medium text-slate-900">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            單位：{item.unit}
                                                            {item.notes ? ` · ${item.notes}` : ""}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{item.category}</TableCell>
                                                <TableCell>
                                                    <span className="font-medium">
                                                        {item.currentStock}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        {" "}
                                                        {item.unit}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{item.parLevel}</TableCell>
                                                <TableCell>{item.reorderThreshold}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusBadgeVariant(status)}>
                                                        {status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatTimestamp(item.updatedAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditOpen(item)}
                                                        >
                                                            <Pencil />
                                                            編輯
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => setDeleteTarget(item)}
                                                        >
                                                            <Trash2 />
                                                            刪除
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={formOpen} onOpenChange={handleFormOpenChange}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {formMode === "create" ? "新增庫存項目" : "編輯庫存項目"}
                        </DialogTitle>
                        <DialogDescription>
                            管理單位、標準存量與補貨門檻，讓庫存提醒更準確。
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <InventoryFormField
                                id="inventory-name"
                                label="項目名稱"
                                error={errors.name}
                            >
                                <Input
                                    id="inventory-name"
                                    value={draft.name}
                                    onChange={(event) =>
                                        handleDraftChange("name", event.target.value)
                                    }
                                />
                            </InventoryFormField>
                            <InventoryFormField
                                id="inventory-category"
                                label="分類"
                                error={errors.category}
                            >
                                <Select
                                    value={draft.category}
                                    onValueChange={(value) => handleDraftChange("category", value)}
                                >
                                    <SelectTrigger className="w-full" id="inventory-category">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {INVENTORY_CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </InventoryFormField>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <InventoryFormField
                                id="inventory-unit"
                                label="單位"
                                error={errors.unit}
                            >
                                <Input
                                    id="inventory-unit"
                                    placeholder="例如：公斤、盒、包"
                                    value={draft.unit}
                                    onChange={(event) =>
                                        handleDraftChange("unit", event.target.value)
                                    }
                                />
                            </InventoryFormField>
                            <InventoryFormField
                                id="inventory-current-stock"
                                label="現有庫存"
                                error={errors.currentStock}
                            >
                                <Input
                                    id="inventory-current-stock"
                                    inputMode="numeric"
                                    value={draft.currentStock}
                                    onChange={(event) =>
                                        handleDraftChange("currentStock", event.target.value)
                                    }
                                />
                            </InventoryFormField>
                            <InventoryFormField
                                id="inventory-par-level"
                                label="標準存量"
                                error={errors.parLevel}
                            >
                                <Input
                                    id="inventory-par-level"
                                    inputMode="numeric"
                                    value={draft.parLevel}
                                    onChange={(event) =>
                                        handleDraftChange("parLevel", event.target.value)
                                    }
                                />
                            </InventoryFormField>
                        </div>

                        <InventoryFormField
                            id="inventory-reorder-threshold"
                            label="補貨門檻"
                            error={errors.reorderThreshold}
                        >
                            <Input
                                id="inventory-reorder-threshold"
                                inputMode="numeric"
                                value={draft.reorderThreshold}
                                onChange={(event) =>
                                    handleDraftChange("reorderThreshold", event.target.value)
                                }
                            />
                        </InventoryFormField>

                        <InventoryFormField id="inventory-notes" label="備註" error={errors.notes}>
                            <Textarea
                                id="inventory-notes"
                                placeholder="補貨頻率、保存條件、供應商提醒等"
                                value={draft.notes}
                                onChange={(event) => handleDraftChange("notes", event.target.value)}
                            />
                        </InventoryFormField>

                        <DialogFooter>
                            <DialogClose render={<Button variant="outline" type="button" />}>
                                取消
                            </DialogClose>
                            <Button type="submit">
                                {formMode === "create" ? "儲存項目" : "更新項目"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={Boolean(deleteTarget)}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>刪除庫存項目</DialogTitle>
                        <DialogDescription>
                            這個操作會永久移除該項目，且會同步更新本機庫存資料。
                        </DialogDescription>
                    </DialogHeader>
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                        {deleteTarget ? (
                            <p>
                                確定要刪除{" "}
                                <span className="font-semibold">{deleteTarget.name}</span> 嗎？
                            </p>
                        ) : null}
                    </div>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" type="button" />}>
                            取消
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            確認刪除
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
