export const STAFF_STORAGE_KEY = "boba-pos.staff.v1";
export const AUTH_SESSION_STORAGE_KEY = "boba-pos.auth-session.v1";

export const STAFF_ROLE_OPTIONS = ["經理", "收銀", "店主", "廚房"];
export const STAFF_STATUS_OPTIONS = ["啟用", "停用"];

export const STAFF_SEED_ITEMS = [
  {
    id: "staff-1001",
    name: "何榮基",
    loginName: "markho",
    role: "店主",
    status: "啟用",
    password: "111111",
    updatedAt: "2026-03-18T09:00:00.000Z",
  },
  {
    id: "staff-1002",
    name: "陳家樂",
    loginName: "manager01",
    role: "經理",
    status: "啟用",
    password: "222222",
    updatedAt: "2026-03-18T09:30:00.000Z",
  },
  {
    id: "staff-1003",
    name: "黃佩琪",
    loginName: "cashier01",
    role: "收銀",
    status: "啟用",
    password: "333333",
    updatedAt: "2026-03-18T10:00:00.000Z",
  },
  {
    id: "staff-1003",
    name: "趙志光",
    loginName: "kitchen01",
    role: "廚房",
    status: "啟用",
    password: "444444",
    updatedAt: "2026-03-18T10:00:00.000Z",
  },
];
