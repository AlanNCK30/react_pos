import { NavLink } from "react-router";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "POS", path: "/pos" },
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
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-slate-80 hover:text-white"
                }`
              }>
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
