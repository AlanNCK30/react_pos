import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/logo.svg";

export default function TopBar() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("zh-HK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b-2 border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 bg-chart-1 px-4 py-2 rounded-2xl">
        <img src={Logo} alt="logo" className="h-12 w-auto object-contain" />
        <h1 className="text-2xl font-bold text-emerald-900 tracking-tight">基哥茶飲店</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-black font-medium bg-chart-1 px-4 py-2 rounded-xl">
          {formattedDate}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-black bg-chart-1 shadow-md transition-hover hover:opacity-80 cursor-pointer">
          <FontAwesomeIcon icon={faUser} className="text-sm opacity-80" />
          <p className="font-semibold">Mark Ho</p>
        </div>
      </div>
    </div>
  );
}
