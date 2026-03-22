import { STAFF_SEED_ITEMS, STAFF_STORAGE_KEY } from "@/data/staff";
import { getProtectedStaffMessage, isOwnerStaff } from "@/features/staff/utils/staffHelpers";

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

export function resetStaffItems() {
  const nextItems = STAFF_SEED_ITEMS.map((item) => ({
    ...item,
  }));
  saveStaffItems(nextItems);
  return nextItems;
}

export function createStaffItem(newStaff) {
  const currentItems = loadStaffItems();
  const nextItems = [newStaff, ...currentItems];
  saveStaffItems(nextItems);
  return nextItems;
}

export function updateStaffItem(staffId, updates) {
    const currentItems = loadStaffItems();
    const targetStaff = currentItems.find((staff) => staff.id === staffId);

    if (!targetStaff) {
        return {
            ok: false,
            message: "找不到指定的員工帳號。",
            items: currentItems,
        };
    }

    if (
        isOwnerStaff(targetStaff) &&
        Object.prototype.hasOwnProperty.call(updates, "status") &&
        updates.status === "停用"
    ) {
        return {
            ok: false,
            message: getProtectedStaffMessage(targetStaff),
            items: currentItems,
        };
    }

    const nextItems = currentItems.map((staff) =>
        staff.id === staffId
            ? {
                  ...staff,
                  ...updates,
                  updatedAt: new Date().toISOString(),
              }
            : staff
    );

    saveStaffItems(nextItems);

    return {
        ok: true,
        items: nextItems,
    };
}

export function deactivateStaffItem(staffId) {
    const currentItems = loadStaffItems();
    const targetStaff = currentItems.find((staff) => staff.id === staffId);

    if (!targetStaff) {
        return {
            ok: false,
            message: "找不到指定的員工帳號。",
            items: currentItems,
        };
    }

    if (isOwnerStaff(targetStaff)) {
        return {
            ok: false,
            message: getProtectedStaffMessage(targetStaff),
            items: currentItems,
        };
    }

    const nextItems = currentItems.map((staff) =>
        staff.id === staffId
            ? {
                  ...staff,
                  status: "停用",
                  updatedAt: new Date().toISOString(),
              }
            : staff
    );

    saveStaffItems(nextItems);

    return {
        ok: true,
        items: nextItems,
    };
}

export function toggleStaffStatus(staffId) {
    const currentItems = loadStaffItems();
    const targetStaff = currentItems.find((staff) => staff.id === staffId);

    if (!targetStaff) {
        return {
            ok: false,
            message: "找不到指定的員工帳號。",
            items: currentItems,
        };
    }

    if (isOwnerStaff(targetStaff)) {
        return {
            ok: false,
            message: getProtectedStaffMessage(targetStaff),
            items: currentItems,
        };
    }

    const nextStatus = targetStaff.status === "停用" ? "啟用" : "停用";
    const nextItems = currentItems.map((staff) =>
        staff.id === staffId
            ? {
                  ...staff,
                  status: nextStatus,
                  updatedAt: new Date().toISOString(),
              }
            : staff
    );

    saveStaffItems(nextItems);

    return {
        ok: true,
        items: nextItems,
        nextStatus,
        message: `${targetStaff.name} 已${nextStatus}。`,
    };
}

export function deleteStaffItem(staffId) {
    const currentItems = loadStaffItems();
    const targetStaff = currentItems.find((staff) => staff.id === staffId);

    if (!targetStaff) {
        return {
            ok: false,
            message: "找不到指定的員工帳號。",
            items: currentItems,
        };
    }

    if (isOwnerStaff(targetStaff)) {
        return {
            ok: false,
            message: getProtectedStaffMessage(targetStaff),
            items: currentItems,
        };
    }

    const nextItems = currentItems.filter((staff) => staff.id !== staffId);
    saveStaffItems(nextItems);

    return {
        ok: true,
        items: nextItems,
    };
}
