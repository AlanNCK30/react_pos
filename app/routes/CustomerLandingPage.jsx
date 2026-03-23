import { ArrowRight, Clock3, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { customerCategories, customerStore } from "@/features/customer/data/customerCatalog";

import { formatCurrency } from "@/utils/formatters";

export default function CustomerLandingPage() {


  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {customerStore.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="rounded-lg bg-slate-100 px-3 py-2">
                <Clock3 className="mr-2 inline size-4" />
                等侯時間約 {customerStore.prepTime}分鐘
              </span>

              <span className="rounded-lg bg-slate-100 px-3 py-2">
                營業時間 {customerStore.serviceHours}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className={`${buttonVariants({ size: "lg" })} rounded-lg`} to="/customer/menu">
                進入菜單
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              alt={customerStore.name}
              className="h-56 w-full object-contain sm:h-72"
              loading="eager"
              src={customerStore.heroImage}
            />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">按系列點餐</h2>
          </div>
          <Link
            className={`${buttonVariants({ variant: "outline" })} hidden rounded-lg sm:inline-flex`}
            to="/customer/menu"
          >
            全部菜單
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {customerCategories.map((category) => (
            <Link
              key={category.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
              to={`/customer/menu?category=${category.id}`}
            >
              <img
                alt={category.name}
                className="size-16 rounded-lg object-cover"
                loading="lazy"
                src={category.image}
              />
              <div className="min-w-0 space-y-2">
                <p className="truncate text-lg font-semibold text-slate-950">{category.name}</p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {formatCurrency(category.startingPrice)} 起
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
