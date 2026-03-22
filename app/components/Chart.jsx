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
  ResponsiveContainer,
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
  { name: "奶茶", value: 45, fill: "#8b5cf6" },
  { name: "水果茶", value: 25, fill: "#ec4899" },
  { name: "沙冰", value: 20, fill: "#06b6d4" },
  { name: "特飲", value: 10, fill: "#f59e0b" },
];

const bobaStockData = [
  { name: "黑糖珍珠", stock: 15, unit: "kg", fill: "#ef4444" },
  { name: "全脂鮮奶", stock: 20, unit: "kg", fill: "#ef4444" },
  { name: "錫蘭紅茶", stock: 8, unit: "kg", fill: "#ef4444" },
  { name: "果糖", stock: 10, unit: "kg", fill: "#ef4444" },
  { name: "椰果", stock: 1, unit: "kg", fill: "#ef4444" },
];

function TopSalesChart() {
  // const theme = useChartTheme(isDarkMode);
  return (
    <LineChart className="w-full h-full aspect-video text-base" responsive data={salesData}>
      <CartesianGrid stroke="var(--chart-1)" strokeDasharray="5 5" />
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
          position="right"
          offset={10}
          fill="#4b5563"
          fontSize={16}
          fontWeight="bold"
          formatter={(value) => `${value} kg`}
        />
      </Bar>
    </BarChart>
  );
}

function SalesLineChart({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-800">每小時銷售趨勢</h3>
        </div>
        <span className="text-emerald-500 font-black text-sm bg-emerald-50 px-3 py-1 rounded-full">
          Live 更新中
        </span>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 14, fontWeight: "bold" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 14, fontWeight: "bold" }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                padding: "12px",
              }}
              itemStyle={{ color: "#10b981", fontWeight: "bold" }}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={4}
              dot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PaymentPieChart({ data }) {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-96 flex flex-col relative">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-800">支付方式佔比</h3>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              fontSize={20}></Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
          <span className="text-xl font-bold text-slate-400 uppercase">總計收納</span>
          <span className="text-xl font-black text-slate-800">
            ${(totalValue / 1000).toFixed(1)}k
          </span>
        </div>
      </div>
    </div>
  );
}

function CategoryBarChart({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-96 flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-800">各系列銷售排行</h3>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="category"
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: "#64748b", fontSize: 16, fontWeight: "bold" }}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "銷售額"]}
            />
            <Bar dataKey="total" radius={[0, 10, 10, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#059669" : "#10b981"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TransactionTable({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-800">今日交易流水帳</h3>
      </div>
      <table className="w-full rounded-md overflow-hidden">
        <thead className="bg-primary text-primary-foreground text-xl">
          <tr>
            <th>訂單編號</th>
            <th>時間</th>
            <th>飲品內容</th>
            <th>數量(杯)</th>
            <th>原價($)</th>
            <th>實收金額($)</th>
            <th>折扣(%)</th>
            <th>支付方式</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.map((trx) => (
            <tr key={trx.id} className="hover:bg-blue-50 transition-colors text-center text-xl">
              <td>{trx.id}</td>
              <td>{trx.time}</td>
              <td>{trx.items}</td>
              <td>{trx.itemCount}</td>
              <td>{trx.originalAmount}</td>
              <td>{trx.finalAmount}</td>
              <td>{trx.discount}</td>
              <td>{trx.payment}</td>
              <td>{trx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export {
  TopSalesChart,
  SalesByDrinksPieChart,
  LowStockBarChart,
  SalesLineChart,
  PaymentPieChart,
  CategoryBarChart,
  TransactionTable,
};
