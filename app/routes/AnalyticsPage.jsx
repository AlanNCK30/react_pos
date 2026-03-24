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

const exportToCSV = (data) => {
  if (!data || !data.length) {
    return;
  }
  const headers = [
    "交易編號",
    "交易時間",
    "品項內容",
    "數量",
    "原始金額",
    "折扣",
    "最終金額",
    "支付方式",
    "狀態",
  ];
  const rows = data.map((row) =>
    [
      `"${row.id}"`,
      `"${row.time}"`,
      `"${row.items.replace(/"/g, '""')}"`,
      row.itemCount,
      row.originalAmount,
      row.discount,
      row.finalAmount,
      `"${row.payment}"`,
      `"${row.status}"`,
    ].join(","),
  );
  const csvContent = "\ufeff" + [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", `POS_Sales_${rows[0]?.id || "report"}.csv`);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

function AnalyticsPage() {
  return (
    <div className="flex flex-col w-full h-screen py-2 px-2">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl">銷售分析</h1>
        </div>
        <button
          onClick={() => exportToCSV(dailyTransactions)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-sm font-bold text-xl cursor-pointer">
          📥 匯出報表
        </button>
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
