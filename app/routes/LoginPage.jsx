import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticateStaff, getAuthSession } from "@/features/auth/authSession";
import { loadStaffItems } from "@/features/staff/data/staffRepository";

export default function LoginPage() {
  const navigate = useNavigate();
  const existingSession = getAuthSession();
  const demoAccounts = useMemo(
    () => loadStaffItems().filter((staff) => staff.status === "啟用"),
    []
  );
  const [credentials, setCredentials] = useState({
    loginName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  if (existingSession) {
    return <Navigate to="/" replace />;
  }

  function handleChange(field, value) {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
    setErrorMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = authenticateStaff(credentials.loginName, credentials.password);

    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_45%),linear-gradient(135deg,_#f8fafc,_#dbeafe_55%,_#eff6ff)] px-6 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl ring-1 ring-white/10 lg:p-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <ShieldCheck className="size-4" />
              Demo Access
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">基哥茶飲 POS</h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                使用示範帳號登入後即可進入儀表板、員工管理、訂單歷史與庫存管理頁面。
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
              示範帳號
            </h2>
            <div className="grid gap-3">
              {demoAccounts.map((staff) => (
                <div
                  key={staff.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">
                      <UserRound className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium">{staff.name}</p>
                      <p className="text-sm text-slate-300">
                        {staff.role} · 登入名稱 `{staff.loginName}` · 密碼 `{staff.password}`
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="border-0 bg-white/95 py-8 shadow-2xl ring-1 ring-slate-200 backdrop-blur">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-semibold text-slate-950">登入系統</CardTitle>
            <CardDescription className="text-base text-slate-600">
              輸入登入名稱與密碼，開始使用後台功能。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="login-name">登入名稱</Label>
                <Input
                  id="login-name"
                  value={credentials.loginName}
                  onChange={(event) => handleChange("loginName", event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">密碼</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={credentials.password}
                  onChange={(event) => handleChange("password", event.target.value)}
                />
              </div>

              {errorMessage ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}

              <Button className="mt-2 h-11 text-base" type="submit">
                登入
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
