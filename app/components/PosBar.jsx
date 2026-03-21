import React from "react";

function PosBar({ cartCount, onClearCart, onSearch }) {
  return (
    <div className="flex justify-start text-2xl gap-2 bg-background/90 text-black w-full py-2 px-2">
      <div className="text-3xl text-black mr-auto">
        <h2>POS</h2>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 size-8">🔍</span>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="快速搜尋飲品..."
          className="tracking-wide pl-10 py-3 px-6 bg-primary/90 text-muted border-none rounded-xl w-64 focus:ring-4 focus:ring-muted-foreground focus:bg-primary transition-all"
        />
      </div>
      <div>
        <button
          disabled={cartCount === 0}
          onClick={onClearCart}
          className="flex items-center py-3 px-4 bg-primary rounded-xl disabled:cursor-not-allowed transition-all active:scale-95 text-primary-foreground">
          <span className="size-8">🗑️</span>
          <span className="text-muted/90 font-black tracking-wider px-2">
            清空全單 ({cartCount})
          </span>
        </button>
      </div>
    </div>
  );
}

export default PosBar;
