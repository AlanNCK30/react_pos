import { NavLink } from "react-router";
import { faGauge, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipboardClock } from "lucide-react";

const menuItems = [
    { name: "儀表板", path: "/", icon: faGauge },
    { name: "POS", path: "/pos", icon: faUser },
    { name: "訂單歷史", path: "/order-history", icon: faUser },
    { name: "庫存管理", path: "/inventory", icon: faUser },
    { name: "員工管理", path: "/employee", icon: faUser },
];

export default function SideBar() {
  return (
    <div>
      <nav className="flex flex-col">
        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition-colors mb-2 ${
                  isActive
                    ? "bg-chart-2 text-chart-5 font-bold"
                    : "hover:bg-chart-3 hover:text-black"
                }`
              }>
              <FontAwesomeIcon icon={item.icon} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
