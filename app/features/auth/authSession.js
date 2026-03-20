import { AUTH_SESSION_STORAGE_KEY } from "@/data/staff";
import { loadStaffItems } from "@/features/staff/data/staffRepository";

export function getAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    const session = JSON.parse(rawSession);
    return session && typeof session === "object" ? session : null;
  } catch (error) {
    console.error("Unable to parse auth session.", error);
    return null;
  }
}

export function saveAuthSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

export function authenticateStaff(loginName, password) {
  const normalizedLoginName = loginName.trim().toLowerCase();
  const staffItems = loadStaffItems();

  const matchedStaff = staffItems.find(
    (staff) =>
      staff.loginName.toLowerCase() === normalizedLoginName &&
      staff.password === password
  );

  if (!matchedStaff) {
    return {
      ok: false,
      message: "登入名稱或密碼不正確。",
    };
  }

  if (matchedStaff.status !== "啟用") {
    return {
      ok: false,
      message: "此帳號目前未啟用，請聯絡管理員。",
    };
  }

  const nextSession = {
    staffId: matchedStaff.id,
    displayName: matchedStaff.name,
    loginName: matchedStaff.loginName,
    role: matchedStaff.role,
  };

  saveAuthSession(nextSession);

  return {
    ok: true,
    session: nextSession,
  };
}
