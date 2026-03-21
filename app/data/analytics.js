export const hourlySalesData = [
  { time: "10:00", amount: 420, orders: 12 },
  { time: "11:00", amount: 580, orders: 15 },
  { time: "12:00", amount: 1200, orders: 35 }, // 午餐高峰
  { time: "13:00", amount: 950, orders: 28 },
  { time: "14:00", amount: 600, orders: 18 },
  { time: "15:00", amount: 1500, orders: 42 }, // 下午茶高峰
  { time: "16:00", amount: 1100, orders: 30 },
  { time: "17:00", amount: 800, orders: 22 },
  { time: "18:00", amount: 750, orders: 20 },
];
export const paymentMethodData = [
  { name: "現金", value: 4500, fill: "#F59E0B" }, // Amber-500
  { name: "八達通", value: 8200, fill: "#3B82F6" }, // Blue-500
  { name: "支付寶", value: 3100, fill: "#0EA5E9" }, // Sky-500
  { name: "微信支付", value: 2400, fill: "#10B981" }, // Emerald-500
  { name: "PayMe", value: 1800, fill: "#EF4444" }, // Red-500
];
export const categorySalesData = [
  { category: "茗茶系列", total: 5200, cups: 260 },
  { category: "鮮奶茶系列", total: 7800, cups: 280 },
  { category: "特調系列", total: 3400, cups: 120 },
  { category: "果茶系列", total: 4600, cups: 150 },
  { category: "茶拿鐵系列", total: 6100, cups: 210 },
];
export const kpiData = [
  {
    id: "NET_SALES",
    label: "今日營業額",
    value: 12840,
    unit: "$",
    change: 12.5, // 相對於昨日上升 12.5%
    isUp: true,
    icon: "💰",
    description: "扣除折扣後的實際收入",
  },
  {
    id: "ORDER_COUNT",
    label: "總成交訂單",
    value: 246,
    unit: "單",
    change: -2.1, // 相對於昨日下降 2.1%
    isUp: false,
    icon: "🧾",
    description: "今日已完成結帳的訂單數",
  },
  {
    id: "AVG_CHECK",
    label: "平均客單價",
    value: 52.2,
    unit: "$",
    change: 5.8,
    isUp: true,
    icon: "📈",
    description: "每張訂單的平均消費額",
  },
  {
    id: "CUP_COUNT",
    label: "總出餐杯數",
    value: 418,
    unit: "杯",
    change: 8.4,
    isUp: true,
    icon: "🥤",
    description: "水吧今日累計製作飲品數量",
  },
];
