import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

export default function RootLayout() {
  return (
    <div className="grid grid-cols-[280px_1fr] h-screen w-full overflow-hidden bg-slate-50">
      <aside className="bg-slate-300 text-black p-4 flex flex-col overflow-auto">
        <h2 className="font-bold mb-4 text-4xl">SideBar</h2>
        <nav className="space-y-2">
          <SideBar />
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
