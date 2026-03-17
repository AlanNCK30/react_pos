import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
import TopBar from "@/components/Topbar";
import Logo from "@/components/Logo";

export default function RootLayout() {
  return (
    <div className="grid grid-cols-[280px_1fr] h-screen w-screen bg-slate-50">
      <aside className="bg-slate-300 text-black p-4 flex flex-col overflow-auto">
        <Logo />
        <nav className="space-y-2">
          <SideBar />
        </nav>
      </aside>
      <div className="flex flex-col h-screen">
        <header>
          <TopBar />
        </header>
        <main className="overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
