import { useState, useEffect } from "react";

function KitchenDisplayPage() {
  const [view, setView] = useState("processing");
  const [now, setNow] = useState(Date.now);
  const MAX_PROCESSING = 4;

  const pendingList = [
    {
      id: "1003",
      startTime: Date.now() - 40000,
      items: [
        {
          name: "御選綠茶",
          size: "medium",
          sweetness: 70,
          ice: "少冰",
          addons: [{ item: "珍珠" }, { item: "仙草" }],
        },
      ],
    },
    {
      id: "1004",
      startTime: Date.now() - 30000,
      items: [
        {
          name: "檸檬紅茶",
          size: "medium",
          sweetness: 50,
          ice: "正常",
          addons: [{ item: "愛玉" }],
        },
      ],
    },
    {
      id: "1005",
      startTime: Date.now() - 20000,
      items: [
        { name: "鮮莓綠茶", size: "large", sweetness: 0, ice: "正常", addons: [{ item: "紅豆" }] },
      ],
    },
  ];
  const processingList = [
    {
      id: "1001",
      startTime: Date.now() - 120000,
      items: [
        {
          name: "913茶王",
          size: "large",
          sweetness: 70,
          ice: "少冰",
          addons: [{ item: "珍珠" }],
        },
      ],
    },
    {
      id: "1002",
      startTime: Date.now() - 30000,
      items: [{ name: "珍珠鮮奶茶", size: "medium", sweetness: 0, ice: "去冰", addons: [] }],
    },
  ];
  const processedList = [];

  const [orders, setOrders] = useState({
    pending: pendingList,
    processing: processingList,
    processed: processedList,
    cancelled: [],
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const moveOrder = (orderId, from, to) => {
    if (to === "processing" && orders.processing.length >= MAX_PROCESSING) {
      return alert(`製作區已滿 (${MAX_PROCESSING}杯)！請先完成現有飲品。`);
    }
    const targetOrder = orders[from].find((o) => o.id === orderId);
    setOrders((prev) => ({
      ...prev,
      [from]: prev[from].filter((o) => o.id !== orderId),
      [to]: [...prev[to], { ...targetOrder, updateTime: Date.now() }],
    }));
  };

  const handleCancel = (orderId, from) => {
    if (window.confirm("確定要取消此訂單嗎？")) {
      const targetOrder = orders[from].find((o) => o.id === orderId);
      setOrders((prev) => ({
        ...prev,
        [from]: prev[from].filter((o) => o.id !== orderId),
        cancelled: [
          ...prev.cancelled,
          {
            ...targetOrder,
            endTime: Date.now(),
          },
        ],
      }));
    }
  };

  const getDuration = (order) => {
    const referenceTime = order.endTime ? order.endTime : now;
    const diff = Math.floor((referenceTime - order.startTime) / 1000);
    if (diff < 60) {
      return "剛剛";
    } else {
      return `${Math.floor(diff / 60)}分 ${diff % 60}秒`;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="text-3xl text-black p-3">
        <h2>廚房顯示系統</h2>
      </div>
      <div className="flex p-4 gap-4 shadow-2xl m-4">
        {["pending", "processing", "processed"].map((status) => (
          <button
            key={status}
            onClick={() => setView(status)}
            className={`flex-1 py-4 rounded-2xl font-black text-xl uppercase tracking-widest transition-all ${
              view === status
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-slate-800 text-slate-500 hover:text-slate-300"
            }`}>
            {status === "pending" ? "待處理" : status === "processing" ? "製作中" : "已完成"}
            <span className="ml-3 text-xl opacity-70">({orders[status].length})</span>
          </button>
        ))}
        <button
          onClick={() => setView("cancelled")}
          className="px-6 py-4 bg-red-900/30 text-red-500 rounded-2xl font-bold text-sm">
          已取消 ({orders.cancelled.length})
        </button>
      </div>
      {/* 訂單內容區 */}
      <div className="flex-1 overflow-y-auto p-6 shadow-2xl m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders[view].map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-4xl shadow-xl border-t-8 border-emerald-500 overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-300">
              {/* Header */}
              <div className="p-5 bg-slate-50 border-b flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">訂單編號</p>
                  <h3 className="text-3xl font-black text-slate-800">#{order.id}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    {order.endTime ? "總計停留時間" : "等待時間"}
                  </p>
                  <p
                    className={`text-lg font-black ${order.endTime ? "text-slate-400" : now - order.startTime > 300000 ? "text-red-500" : "text-emerald-600"}`}>
                    {getDuration(order)}
                  </p>
                </div>
              </div>

              {/* 飲品詳情 */}
              <div className="p-6 flex-1 space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md font-black uppercase">
                        {item.size === "large" ? "大杯 L" : "中杯 M"}
                      </span>
                      <h4 className="text-2xl font-bold text-slate-800">{item.name}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-xl font-bold text-sm">
                        {item.sweetness}% 甜
                      </span>
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-xl font-bold text-sm">
                        {item.ice}
                      </span>
                      {item.addons.map((a, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-xl font-bold text-sm">
                          + {a.item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部動作區域：僅在 Pending 或 Processing 視圖顯示 */}
              {view !== "processed" && view !== "cancelled" && (
                <div className="flex w-full border-t border-slate-100">
                  {/* 1. 取消按鈕 (佔比較小) */}
                  <button
                    onClick={() => handleCancel(order.id, view)}
                    className="flex-1 py-6 bg-red-50 text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white transition-colors border-r border-slate-100">
                    取消
                  </button>

                  {/* 2. 主動作按鈕 (佔比較大) */}
                  <button
                    onClick={() =>
                      moveOrder(order.id, view, view === "pending" ? "processing" : "processed")
                    }
                    className={`flex-3 py-6 font-black text-2xl transition-all active:scale-95 ${
                      view === "pending"
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "bg-primary text-primary-foreground hover:bg-emerald-700"
                    }`}>
                    {view === "pending" ? "開始 START" : "完成 DONE"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {orders[view].length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 italic">
            目前沒有{" "}
            {view === "processing" ? "正在製作中" : view === "pending" ? "待處理" : "已完成"} 的訂單
          </div>
        )}
      </div>
    </div>
  );
}

export default KitchenDisplayPage;
