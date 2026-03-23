import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { RotateCcw, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticateStaff, clearAuthSession, getAuthSession } from "@/features/auth/authSession";
import { resetInventoryItems } from "@/features/inventory/data/inventoryRepository";
import { loadStaffItems, resetStaffItems } from "@/features/staff/data/staffRepository";

function getEnabledDemoAccounts() {
  return loadStaffItems().filter((staff) => staff.status === "啟用");
  // return loadStaffItems();
}

export default function LoginPage() {
  const navigate = useNavigate();
  const existingSession = getAuthSession();
  const [demoAccounts, setDemoAccounts] = useState(() => loadStaffItems());
  const [credentials, setCredentials] = useState({
    loginName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState(null);

  if (existingSession) {
    return <Navigate to="/" replace />;
  }

  function handleChange(field, value) {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
    setErrorMessage("");
    setFeedback(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback(null);

    const result = authenticateStaff(credentials.loginName, credentials.password);

    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    navigate("/", { replace: true });
  }

  function handleResetLatestData() {
    const latestStaffItems = resetStaffItems();
    resetInventoryItems();
    clearAuthSession();
    setDemoAccounts(latestStaffItems.filter((staff) => staff.status === "啟用"));
    setCredentials({
      loginName: "",
      password: "",
    });
    setErrorMessage("");
    setFeedback({
      type: "success",
      message: "Loaded。",
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary px-6 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-8%] h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-6xl gap-6 xl:grid-cols">
        <Card className="border-0 bg-slate-950/90 py-0 text-white shadow-2xl ring-1 ring-slate-900/10 backdrop-blur">
          <CardHeader className="gap-5 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="space-y-3">
              <CardTitle className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                基哥茶飲 POS
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                輸入登入名稱與密碼後，即可開始使用門市管理功能/POS。
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8 lg:px-10 lg:pb-10">
            <div className="rounded-[1.75rem] bg-white p-5 text-slate-950 shadow-2xl ring-1 ring-slate-200 sm:p-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  登入系統
                </p>
              </div>

              <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="login-name">登入名稱</Label>
                    <Input
                      id="login-name"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4"
                      value={credentials.loginName}
                      onChange={(event) => handleChange("loginName", event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">密碼</Label>
                    <Input
                      id="login-password"
                      type="password"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4"
                      value={credentials.password}
                      onChange={(event) => handleChange("password", event.target.value)}
                    />
                  </div>
                </div>

                {feedback ? (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm ${
                      feedback.type === "success"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-rose-200 bg-rose-50 text-rose-700"
                    }`}
                  >
                    {feedback.message}
                  </div>
                ) : null}

                {errorMessage ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errorMessage}
                  </div>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Button className="h-12 rounded-xl text-base" type="submit">
                    登入
                  </Button>
                  <Button
                    className="h-12 rounded-xl px-5"
                    type="button"
                    variant="outline"
                    onClick={handleResetLatestData}
                  >
                    <RotateCcw />
                    Load
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="self-center border-0 bg-white/92 py-0 shadow-2xl ring-1 ring-slate-200 backdrop-blur ">
          <CardHeader className="gap-3 border-b border-slate-100 px-6 py-6">
            <CardTitle className="text-2xl font-semibold text-slate-950">示範帳號</CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-600">
              這些帳號可直接登入系統。
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="grid gap-3">
              {demoAccounts.map((staff) => (
                <div
                  key={staff.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <UserRound className="size-5" />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <div>
                        <p className="text-base font-semibold text-slate-950">{staff.name}</p>
                        <p className="text-sm text-slate-500">{staff.role}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                          帳號: {staff.loginName}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                          密碼: {staff.password}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
