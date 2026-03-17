import DashboardBar from "@/components/DashboardBar";
import { TopSalesChart, SalesByDrinksPieChart, LowStockBarChart } from "@/components/Chart";
import CardLayout from "@/layouts/CardLayout";
import Promotion from "@/components/Promotion";
import Notice from "@/components/Notice";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardBar />

      <div className="w-full h-full grid grid-cols-3 gap-6 px-3.5">
        <CardLayout title={"Weekly Sales"} children={<TopSalesChart />} />
        <CardLayout title={"Sales by Drinks"} children={<SalesByDrinksPieChart />} />
        <CardLayout
          title={"Low Stock Alert"}
          children={<LowStockBarChart />}
          className="row-span-2"
        />
        <CardLayout title={"Today's Promotion"} children={<Promotion />} />
        <CardLayout title={"Notice"} children={<Notice />} className={"overflow-y-auto"} />
      </div>
    </div>
  );
}
