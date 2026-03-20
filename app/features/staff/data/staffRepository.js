import { STAFF_SEED_ITEMS, STAFF_STORAGE_KEY } from "@/data/staff";

export function loadStaffItems() {
  if (typeof window === "undefined") {
    return STAFF_SEED_ITEMS;
  }

  try {
    const storedItems = window.localStorage.getItem(STAFF_STORAGE_KEY);

    if (!storedItems) {
      window.localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(STAFF_SEED_ITEMS));
      return STAFF_SEED_ITEMS;
    }

    const parsedItems = JSON.parse(storedItems);

    if (Array.isArray(parsedItems)) {
      return parsedItems;
    }
  } catch (error) {
    console.error("Unable to load staff items from localStorage.", error);
  }

  return STAFF_SEED_ITEMS;
}

export function saveStaffItems(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(items));
}

export function createStaffItem(newStaff) {
  const currentItems = loadStaffItems();
  const nextItems = [newStaff, ...currentItems];
  saveStaffItems(nextItems);
  return nextItems;
}
