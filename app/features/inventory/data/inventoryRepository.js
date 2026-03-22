import {
  INVENTORY_SEED_ITEMS,
  INVENTORY_STORAGE_KEY,
} from "@/data/inventory";

export function loadInventoryItems() {
  if (typeof window === "undefined") {
    return INVENTORY_SEED_ITEMS;
  }

  try {
    const storedItems = window.localStorage.getItem(INVENTORY_STORAGE_KEY);

    if (!storedItems) {
      window.localStorage.setItem(
        INVENTORY_STORAGE_KEY,
        JSON.stringify(INVENTORY_SEED_ITEMS)
      );
      return INVENTORY_SEED_ITEMS;
    }

    const parsedItems = JSON.parse(storedItems);

    if (Array.isArray(parsedItems)) {
      return parsedItems;
    }
  } catch (error) {
    console.error("Unable to load inventory items from localStorage.", error);
  }

  return INVENTORY_SEED_ITEMS;
}

export function saveInventoryItems(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items));
}

export function resetInventoryItems() {
  const nextItems = INVENTORY_SEED_ITEMS.map((item) => ({
    ...item,
  }));
  saveInventoryItems(nextItems);
  return nextItems;
}
