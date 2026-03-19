export const INVENTORY_FILTER_ALL = "全部";

export const DEFAULT_INVENTORY_FILTERS = {
  query: "",
  category: INVENTORY_FILTER_ALL,
  status: INVENTORY_FILTER_ALL,
};

export function getInventoryStatus(item) {
  if (item.currentStock === 0) {
    return "缺貨";
  }

  if (item.currentStock <= item.reorderThreshold) {
    return "庫存偏低";
  }

  return "正常";
}

export function getStatusBadgeVariant(status) {
  if (status === "缺貨") {
    return "destructive";
  }

  if (status === "庫存偏低") {
    return "secondary";
  }

  return "outline";
}

export function sortByUrgency(a, b) {
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

export function filterInventoryItems(items, filters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    const normalizedNotes = item.notes?.toLowerCase() ?? "";
    const matchesQuery =
      normalizedQuery.length === 0 ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      normalizedNotes.includes(normalizedQuery);
    const matchesCategory =
      filters.category === INVENTORY_FILTER_ALL || item.category === filters.category;
    const itemStatus = getInventoryStatus(item);
    const matchesStatus =
      filters.status === INVENTORY_FILTER_ALL || itemStatus === filters.status;

    return matchesQuery && matchesCategory && matchesStatus;
  });
}

export function getLowStockItems(items) {
  return items
    .filter((item) => getInventoryStatus(item) !== "正常")
    .sort(sortByUrgency);
}

export function buildSummary(items) {
  return {
    totalItems: items.length,
    lowStockCount: items.filter((item) => getInventoryStatus(item) === "庫存偏低")
      .length,
    outOfStockCount: items.filter((item) => getInventoryStatus(item) === "缺貨")
      .length,
    totalUnits: items.reduce((sum, item) => sum + item.currentStock, 0),
  };
}

export function hasActiveInventoryFilters(filters) {
  return (
    filters.query.trim().length > 0 ||
    filters.category !== INVENTORY_FILTER_ALL ||
    filters.status !== INVENTORY_FILTER_ALL
  );
}
