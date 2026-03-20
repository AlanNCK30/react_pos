export const STAFF_STORAGE_KEY = "boba-pos.staff.v1";
export const AUTH_SESSION_STORAGE_KEY = "boba-pos.auth-session.v1";

export const STAFF_ROLE_OPTIONS = ["經理", "普通員工", "店主"];
export const STAFF_STATUS_OPTIONS = ["啟用", "停用"];

export const STAFF_SEED_ITEMS = [
  {
    id: "staff-1001",
    name: "何榮基",
    loginName: "markho",
    role: "店主",
    status: "啟用",
    password: "owner123",
    updatedAt: "2026-03-18T09:00:00.000Z",
  },
  {
    id: "staff-1002",
    name: "陳家樂",
    loginName: "manager01",
    role: "經理",
    status: "啟用",
    password: "manager123",
    updatedAt: "2026-03-18T09:30:00.000Z",
  },
  {
    id: "staff-1003",
    name: "黃佩琪",
    loginName: "cashier01",
    role: "普通員工",
    status: "啟用",
    password: "cashier123",
    updatedAt: "2026-03-18T10:00:00.000Z",
  },
];
