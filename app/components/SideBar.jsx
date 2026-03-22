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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipboardClock } from "lucide-react";

const menuItems = [
  { name: "儀表板", path: "/", icon: faGauge, roles: ["經理", "收銀", "店主", "廚房"] },
  { name: "POS", path: "/pos", icon: faCashRegister, roles: ["經理", "收銀", "店主"] },
  {
    name: "廚房顯示系統",
    path: "/kitchen-display",
    icon: faDisplay,
    roles: ["經理", "收銀", "店主"],
  },
  { name: "產品總覽", path: "/product-catalog", icon: faTable, roles: ["經理", "收銀", "店主"] },
  { name: "產品管理", path: "/product-management", icon: faPenToSquare, roles: ["經理", "店主"] },
  { name: "銷售分析", path: "/sales-analytics", icon: faChartSimple, roles: ["經理", "店主"] },
  { name: "庫存管理", path: "/inventory", icon: faWarehouse, roles: ["經理", "店主"] },
  { name: "訂單歷史", path: "/order-history", icon: faTableList, roles: ["經理", "店主", "收銀"] },
  { name: "員工管理", path: "/employee", icon: faUser, roles: ["店主"] },
];

import { getAuthSession } from "@/features/auth/authSession"
//  roles: ["經理", "收銀", "店主", "廚房"]
export default function SideBar() {
  const session = getAuthSession();
  const userRole = session?.role; 
  return (
    <div>
      <nav className="flex flex-col">
        {menuItems
          .filter((item) => item.roles.includes(userRole))
          .map((item) => {
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
                }
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.name}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
}
