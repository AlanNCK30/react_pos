import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend,
  Cell,
  LabelList,
} from "recharts";

const salesData = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1900 },
  { name: "Wed", sales: 1600 },
  { name: "Thu", sales: 2200 },
  { name: "Fri", sales: 2800 },
  { name: "Sat", sales: 3400 },
  { name: "Sun", sales: 2900 },
];

const categoryData = [
  { name: "Milk Tea", value: 45, fill: "#8b5cf6" },
  { name: "Fruit Tea", value: 25, fill: "#ec4899" },
  { name: "Smoothie", value: 20, fill: "#06b6d4" },
  { name: "Special", value: 10, fill: "#f59e0b" },
];

const bobaStockData = [
  { name: "黑糖珍珠", stock: 15, unit: "kg", fill: "#ef4444" }, // 低於標準，紅色警告
  { name: "全脂鮮奶", stock: 20, unit: "kg", fill: "#ef4444" }, // 充足，灰色
  { name: "錫蘭紅茶", stock: 8, unit: "kg", fill: "#ef4444" }, // 短缺，紅色
  { name: "果糖", stock: 10, unit: "kg", fill: "#ef4444" }, // 警告中，橘色
  { name: "椰果", stock: 1, unit: "kg", fill: "#ef4444" },
];

function TopSalesChart() {
  return (
    <LineChart className="w-full h-full aspect-video text-base" responsive data={salesData}>
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="sales" stroke="purple" strokeWidth={2} name="Total Sales" />
      <XAxis dataKey="name" />
      <YAxis width="auto" label={{ value: "Sales($)", position: "insideLeft", angle: "-90" }} />
      <Legend align="center" />
      <Tooltip />
    </LineChart>
  );
}

function SalesByDrinksPieChart() {
  return (
    <PieChart width="100%" height="100%" responsive>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"></Pie>
      <Tooltip />
    </PieChart>
  );
}

function LowStockBarChart() {
  return (
    <BarChart
      height="100%"
      layout="vertical"
      data={bobaStockData}
      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />

      <XAxis type="number" domain={[0, 100]} />

      <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 16 }} />

      <Tooltip
        cursor={{ fill: "transparent" }}
        formatter={(value, name, props) => [`${value} ${props.payload.unit}`, "庫存量"]}
      />

      <Bar dataKey="stock" radius={[0, 4, 4, 0]} barSize={20}>
        {bobaStockData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
        <LabelList
          dataKey="stock"
          position="right" // 放在長條右側
          offset={10} // 與長條保持 10px 距離
          fill="#4b5563" // 數字顏色 (gray-600)
          fontSize={16}
          fontWeight="bold"
          // 自定義格式，加上單位 kg
          formatter={(value) => `${value} kg`}
        />
      </Bar>
    </BarChart>
  );
}

export { TopSalesChart, SalesByDrinksPieChart, LowStockBarChart };
