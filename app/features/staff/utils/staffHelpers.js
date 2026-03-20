import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/data/staff";

export const DEFAULT_STAFF_FILTERS = {
  query: "",
  role: "全部",
  status: "全部",
};

export function createEmptyStaffDraft() {
  return {
    id: "",
    name: "",
    loginName: "",
    role: STAFF_ROLE_OPTIONS[0],
    status: STAFF_STATUS_OPTIONS[0],
    password: "",
  };
}

export function createDraftFromStaff(staff) {
    return {
        id: staff.id,
        name: staff.name,
        loginName: staff.loginName,
        role: staff.role,
        status: staff.status,
        password: staff.password ?? "",
    };
}

export function isOwnerStaff(staff) {
    return staff?.role === "店主";
}

export function getProtectedStaffMessage(staff) {
    if (isOwnerStaff(staff)) {
        return "店主帳號不可停用或刪除。";
    }

    return "";
}

export function filterStaffItems(items, filters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return items.filter((staff) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      staff.id.toLowerCase().includes(normalizedQuery) ||
      staff.name.toLowerCase().includes(normalizedQuery) ||
      staff.loginName.toLowerCase().includes(normalizedQuery);
    const matchesRole = filters.role === "全部" || staff.role === filters.role;
    const matchesStatus = filters.status === "全部" || staff.status === filters.status;

    return matchesQuery && matchesRole && matchesStatus;
  });
}

export function hasActiveStaffFilters(filters) {
  return (
    filters.query.trim().length > 0 ||
    filters.role !== "全部" ||
    filters.status !== "全部"
  );
}

export function validateStaffDraft(draft, existingStaffItems, options = {}) {
    const { excludeStaffId = null } = options;
    const errors = {};
    const normalizedDraftId = draft.id.trim().toLowerCase();
    const normalizedLoginName = draft.loginName.trim().toLowerCase();
    const comparableStaffItems = existingStaffItems.filter((staff) => staff.id !== excludeStaffId);

    if (!draft.id.trim()) {
        errors.id = "請輸入員工編號。";
    }

    if (!draft.name.trim()) {
        errors.name = "請輸入員工名字。";
    }

    if (!draft.loginName.trim()) {
        errors.loginName = "請輸入登入名稱。";
    }

    if (!draft.password.trim()) {
        errors.password = "請輸入密碼。";
    }

    const duplicatedId = comparableStaffItems.some(
        (staff) => staff.id.toLowerCase() === normalizedDraftId
    );
    if (duplicatedId) {
        errors.id = "員工編號已存在。";
    }

    const duplicatedLoginName = comparableStaffItems.some(
        (staff) => staff.loginName.toLowerCase() === normalizedLoginName
    );
    if (duplicatedLoginName) {
        errors.loginName = "登入名稱已存在。";
    }

    return {
        errors,
        values: {
            id: draft.id.trim(),
            name: draft.name.trim(),
            loginName: draft.loginName.trim(),
            role: draft.role,
            status: draft.status,
            password: draft.password,
        },
    };
}
