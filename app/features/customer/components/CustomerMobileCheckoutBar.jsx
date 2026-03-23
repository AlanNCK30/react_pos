import { Link } from "react-router";

import { formatCurrency } from "@/utils/formatters";

export default function CustomerMobileCheckoutBar({ checkoutHref, itemCount, subtotal }) {
  if (itemCount <= 0) {
    return null;
  }

  return (
    <Link
      className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3 text-base font-medium text-white shadow-xl xl:hidden"
      to={checkoutHref}
    >
      <span>結帳 {itemCount} 件</span>
      <span>{formatCurrency(subtotal)}</span>
    </Link>
  );
}
