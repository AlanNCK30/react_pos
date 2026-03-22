import { NavLink } from "react-router";
import {
  faGauge,
  faUser,
  faCashRegister,
  faTableList,
  faTable,
  faWarehouse,
  faPenToSquare,
  faDisplay,
  faChartSimple,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipboardClock } from "lucide-react";

const menuItems = [
  { name: "儀表板", path: "/", icon: faGauge },
  { name: "POS", path: "/pos", icon: faCashRegister },
  { name: "廚房顯示系統", path: "/kitchen-display", icon: faDisplay },
  { name: "產品總覽", path: "/product-catalog", icon: faTable },
  { name: "產品管理", path: "/product-management", icon: faPenToSquare },
  { name: "銷售分析", path: "/sales-analytics", icon: faChartSimple },
  { name: "庫存管理", path: "/inventory", icon: faWarehouse },
  { name: "訂單歷史", path: "/order-history", icon: faTableList },
  { name: "員工管理", path: "/employee", icon: faUser },
  { name: "會員名錄", path: "/membership", icon: faUserGroup },
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
