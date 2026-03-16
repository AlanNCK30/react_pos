import { NavLink } from "react-router";
import { faGauge, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuItems = [
  { name: "Dashboard", path: "/", icon: faGauge },
  { name: "POS", path: "/pos", icon: faUser },
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
                `px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-slate-600 font-bold"
                    : "hover:bg-blue-400 hover:text-slate-400"
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
