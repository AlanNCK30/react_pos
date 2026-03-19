import React from "react";

function PosBar({ cartCount, onClearCart, onSearch }) {
  return (
    <div className="flex justify-start text-2xl gap-4 text-black w-full p-3">
      <div className="p-3 text-3xl bg-primary rounded-xl mr-auto text-primary-foreground">
        <h2>POS</h2>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400 text-xl">🔍</span>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="快速搜尋飲品..."
          className="pl-9 p-3 bg-primary text-black border-none rounded-xl w-64 focus:ring-2 focus:ring-emerald-500 transition-all"
        />
      </div>
      <div>
        <button
          disabled={cartCount === 0}
          onClick={onClearCart}
          className="flex items-center gap-2 p-3 bg-primary rounded-xl disabled:cursor-not-allowed transition-all active:scale-95 text-primary-foreground">
          <span className="text-lg">🗑️</span>
          <span>清空全單 ({cartCount})</span>
        </button>
      </div>
    </div>
  );
}

export default PosBar;
