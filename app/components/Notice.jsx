import React, { useState } from "react";

function Notice() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      text: "大杯楊枝甘露第二杯半價",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      id: 2,
      text: "燕麥奶已售完，改推鮮奶",
      color: "bg-slate-50 text-slate-700 border-slate-200",
    },
    {
      id: 3,
      text: "加購珍珠只要 5 元",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState("");

  const addNotice = () => {
    if (newText.trim()) {
      setNotices([
        {
          id: Date.now(),
          text: newText,
          color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        },
        ...notices,
      ]);
      setNewText("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col h-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-2 py-0.5 rounded text-xl">
          <span className="text-base font-black bg-orange-500 text-white px-2 py-0.5 rounded group-hover:bg-orange-600 transition-colors">
            {isAdding ? "CANCEL" : "ADD +"}
          </span>
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <input
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNotice()}
            placeholder="輸入話術或公告..."
            className="w-full text-xs border-2 border-indigo-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 shadow-inner bg-indigo-50/30"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`flex justify-between items-center px-4 py-3 rounded-xl border-2 shadow-sm group hover:scale-[1.01] transition-all ${n.color}`}>
            <div className="flex flex-col">
              <span className="font-black text-base leading-tight">{n.text}</span>
            </div>

            <button
              onClick={() => setNotices(notices.filter((item) => item.id !== n.id))}
              className="px-3 py-1 rounded-lg font-black text-base bg-white border border-inherit shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notice;
