import { Link, NavLink, Outlet } from "react-router";
import { ShoppingBag } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { customerStore } from "@/features/customer/data/customerCatalog";
import { useCustomerCart } from "@/features/customer/hooks/useCustomerCart";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/customer", label: "首頁" },
  { to: "/customer/menu", label: "菜單" },
];

export default function CustomerLayout() {
  const customerCart = useCustomerCart();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link className="flex min-w-0 items-center gap-3" to="/customer">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
              基
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">{customerStore.name}</p>
              <p className="truncate text-sm text-slate-500">{customerStore.subtitle}</p>
            </div>
          </Link>

          <Link
            className={`
              ${buttonVariants({ variant: "outline" })}
              "h-10 rounded-lg border-slate-200 px-3 text-sm"
            `}
            to="/customer/menu#cart"
          >
            <ShoppingBag className="size-4" />
            {customerCart.itemCount > 0 ? `購物袋 ${customerCart.itemCount}` : "購物袋"}
          </Link>
        </div>
      </header>

      <Outlet context={customerCart} />
    </div>
  );
}
