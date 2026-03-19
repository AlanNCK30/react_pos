export function useInventory() {
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
}
