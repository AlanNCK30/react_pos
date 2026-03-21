import React from "react";
import { kpiData, hourlySalesData, paymentMethodData, categorySalesData } from "@/data/analytics";

function AnalyticsPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <section className="flex justify-around items-center">
        {kpiData.map((kpi) => (
          <article
            key={kpi.id}
            className="bg-white shadow-2xl shadow-red-700 text-2xl p-4 m-4 rounded-xl">
            <h2>{`${kpi.icon} ${kpi.label}`}</h2>
            <p>{`${kpi.unit}: ${kpi.value}`}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default AnalyticsPage;
