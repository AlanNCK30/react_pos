import DashboardBar from "@/components/DashboardBar";
import { TopSalesChart, SalesByDrinksPieChart, LowStockBarChart } from "@/components/Chart";
import { CardLayout } from "@/layouts/CardLayout";
import Promotion from "@/components/Promotion";
import Notice from "@/components/Notice";

export default function DashboardPage() {
  return (
      <div className="flex flex-col">
          <DashboardBar />

          <div className="w-full h-full grid grid-cols-3 gap-3 px-2">
              <CardLayout title={"週銷售額"} children={<TopSalesChart />} />
              <CardLayout title={"飲品銷售比例"} children={<SalesByDrinksPieChart />} />
              <CardLayout
                  title={"低庫存原料"}
                  children={<LowStockBarChart />}
                  className="row-span-2"
              />
              <CardLayout title={"本日推廣"} children={<Promotion />} />
              <CardLayout title={"注意事項"} children={<Notice />} className={"overflow-y-auto"} />
          </div>
      </div>
  );
}
