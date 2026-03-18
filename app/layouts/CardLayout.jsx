function CardLayout({ children, className, title }) {
  return (
    <div
      className={`flex flex-col text-center text-2xl text-black shadow-sm rounded-2xl bg-chart-1 overflow-hidden ${className}`}>
      <h3 className="bg-chart-2">{title}</h3>
      {children}
    </div>
  );
}

function MenuItemCardLayout({ imagePath, name, price, callback }) {
  return (
    <button
      className="group flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md active:scale-95 text-left"
      onClick={callback}>
      <div className="relative w-full aspect-square bg-chart-2 overflow-hidden">
        <img
          src={imagePath}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {price && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-lg font-bold text-emerald-700">{price}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1 line-clamp-2">{name}</h3>
        <p className="text-sm text-slate-600 font-medium">基哥推薦</p>
      </div>
    </button>
  );
}
function OrderItemCardLayout({ drink, onRemove }) {
  // 從 drink.config 中解構出店員選取的數值
  const { size, sweetness, ice, addons } = drink.config;

  return (
    <div className="relative group bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-red-300 transition-all mb-3">
      {/* 頂部：品名與價格 */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {/* Size 標籤：大杯用深色，中杯用灰色，一眼分辨 */}
          <span
            className={`text-[12px] font-black px-1.5 py-0.5 rounded uppercase ${
              size === "large" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500"
            }`}>
            {size === "large" ? "L" : "M"}
          </span>
          <h3 className="font-bold text-slate-800 truncate max-w-30">{drink.name}</h3>
        </div>
        <span className="font-bold text-emerald-600 text-sm">
          ${size === "medium" ? drink.medium : drink.large}
        </span>
      </div>

      {/* 中間：客製化選項 (甜度 & 冰量) */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className="text-[13px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
          甜度: {sweetness}%
        </span>
        <span className="text-[13px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
          冰量: {ice}
        </span>
      </div>

      {/* 底部：配料清單 (如果有才渲染) */}
      {addons && addons.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-50">
          {addons.map((addon) => (
            <span
              key={addon.id}
              className="text-[13px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
              + {addon.item}
            </span>
          ))}
        </div>
      )}

      {/* 刪除按鈕：Hover 時顯現，方便店員點錯時快速移除 */}
      <button
        onClick={() => onRemove(drink.instanceId)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-lg font-light leading-none">×</span>
      </button>
    </div>
  );
}

export { CardLayout, MenuItemCardLayout, OrderItemCardLayout };
