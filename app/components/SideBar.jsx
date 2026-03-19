import { NavLink } from "react-router";
import {
  faGauge,
  faUser,
  faCashRegister,
  faTableList,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipboardClock } from "lucide-react";

const menuItems = [
  { name: "儀表板", path: "/", icon: faGauge },
  { name: "POS", path: "/pos", icon: faCashRegister },
  { name: "員工管理", path: "/employee", icon: faUser },
  { name: "訂單歷史", path: "/order-history", icon: faTableList },
  { name: "產品總覽", path: "/product-catalog", icon: faTable },
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
                `px-4 py-3 rounded-lg transition-colors mb-2 text-xl ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:bg-chart-3 hover:text-black"
                }`
              }>
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
