import React from "react";
import {
  kpiStats,
  hourlySalesData,
  paymentMethodData,
  categorySalesData,
  dailyTransactions,
} from "@/data/analytics";
import { KpiCardLayout } from "@/layouts/CardLayout";
import {
  SalesLineChart,
  PaymentPieChart,
  CategoryBarChart,
  TransactionTable,
} from "@/components/Chart";

function AnalyticsPage() {
  return (
    <div className="flex flex-col w-full h-screen py-2 px-2">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl">銷售數據中心</h1>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-sm font-bold text-xl">
            📅 今日數據
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-sm font-bold text-xl">
            📥 匯出報表
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpiStats.map((kpi) => (
          <KpiCardLayout key={kpi.id} kpi={kpi} />
        ))}
      </div>
      <div className="mb-8">
        <SalesLineChart data={hourlySalesData} />
      </div>
      <div className="mb-8 flex gap-4">
        <div className="flex-1">
          <PaymentPieChart data={paymentMethodData} />
        </div>
        <div className="flex-1">
          <CategoryBarChart data={categorySalesData} />
        </div>
      </div>
      <div className="mb-8">
        <TransactionTable data={dailyTransactions} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
