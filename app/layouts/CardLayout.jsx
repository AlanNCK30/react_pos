function CardLayout({ children, className, title }) {
  return (
    <div
      className={`flex flex-col text-center text-2xl text-black shadow-sm rounded-2xl bg-primary-foreground overflow-hidden ${className}`}>
      <h3 className="bg-primary text-primary-foreground">{title}</h3>
      {children}
    </div>
  );
}

function MenuItemCardLayout({ imagePath, name, price, callback }) {
  return (
    <button
      className="group flex flex-col bg-primary rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md active:scale-95 text-left cursor-pointer h-75"
      onClick={callback}>
      <div className="relative w-full bg-chart-2 aspect-square overflow-hidden">
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
      <div className="p-4 flex flex-col bg-primary-foreground justify-between flex-1">
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1 line-clamp-2">{name}</h3>
        <p className="text-sm text-slate-600 font-medium">基哥推薦</p>
      </div>
    </button>
  );
}
function OrderItemCardLayout({ drink, onUpdateQty, onRemove }) {
  const { size, sweetness, ice, addons } = drink.config;

  return (
    <div className="relative group bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-red-300 transition-all mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[12px] font-black px-1.5 py-0.5 rounded uppercase ${
              size === "large" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500"
            }`}>
            {size === "large" ? "L" : "M"}
          </span>
          <h3 className="font-bold text-slate-800 truncate max-w-30">{drink.name}</h3>
        </div>
        <span className="font-bold text-emerald-600 text-sm">
          ${(drink.unitPrice * drink.quantity).toFixed(1)}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* 數量控制區 */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-3 mb-1">
          <button
            onClick={() => onUpdateQty(drink.instanceId, -1)}
            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:bg-slate-200">
            -
          </button>
          <span className="text-sm font-bold w-4 text-center">{drink.quantity}</span>
          <button
            onClick={() => onUpdateQty(drink.instanceId, 1)}
            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:bg-slate-200">
            +
          </button>
        </div>

        <p className="text-[11px] text-slate-400">單價: ${drink.unitPrice}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className="text-[13px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
          甜度: {sweetness}%
        </span>
        <span className="text-[13px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
          冰量: {ice}
        </span>
      </div>

      {addons && addons.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-50">
          {addons.map((addon) => (
            <span
              key={addon.id}
              className="text-[13px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
              + {`${addon.item} $${addon.price}`}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => onRemove(drink.instanceId)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-lg font-light leading-none cursor-pointer">×</span>
      </button>
    </div>
  );
}

export { CardLayout, MenuItemCardLayout, OrderItemCardLayout };
