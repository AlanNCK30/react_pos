export const getStatusBadgeVariant = (status) => {
    if (status === "缺貨") {
        return "destructive";
    }

    if (status === "庫存偏低") {
        return "secondary";
    }

    return "outline";
};
export const sortByUrgency = (a, b) => {
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
};

export const buildSummary = (items) => {
    return {
        totalItems: items.length,
        lowStockCount: items.filter((item) => getInventoryStatus(item) === "庫存偏低").length,
        outOfStockCount: items.filter((item) => getInventoryStatus(item) === "缺貨").length,
        totalUnits: items.reduce((sum, item) => sum + item.currentStock, 0),
    };
};
