function CardLayout({ children, className, title }) {
  return (
    <div
      className={`flex flex-col mb-2 text-center text-2xl text-primary-foreground/80 bg-primary-foreground/80 rounded-2xl overflow-hidden border border-secondary shadow-xl ${className}`}>
      <h3 className=" bg-primary/90 text-accent/95 py-1 mb-2 tracking-widestpromax ring ring-secondary">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MenuItemCardLayout({
  imagePath,
  name,
  price,
  callback,
  children,
  isRecommand,
  isSoldOut,
}) {
  return (
    <button
      className="group flex flex-col bg-destructive rounded-3xl overflow-hidden transition-all hover:shadow-md active:scale-95 text-left cursor-pointer h-85 bg-linear-to-b shadow-[0_10px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.05)]  ring-ring border border-primary-foreground relative"
      onClick={callback}
    >
      <div className="relative w-full bg-muted/30 aspect-square overflow-hidden">
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
      <div className="p-4 flex flex-col bg-primary-foreground/95 justify-between flex-1">
        <h3 className="text-2xl tracking-wider font-bold text-slate-800 leading-tight line-clamp-2">
          {name}
        </h3>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-slate-600 font-medium">{children}</p>
          </div>
          <div>{isRecommand && <p className="text-sm text-slate-600 font-medium">基哥推薦</p>}</div>
        </div>
        {isSoldOut && (
          <div className="absolute top-2 right-2 bg-red-600 text-white p-3 rounded-md">
            <p>暫停供應</p>
          </div>
        )}
      </div>
    </button>
  );
}
function OrderItemCardLayout({ drink, onUpdateQty, onRemove }) {
  const { size, sweetness, ice, addons } = drink.config;

  return (
    <div className="relative group bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-red-300 transition-all mb-3 mx-2">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-base font-black px-2 py-1 rounded uppercase ${
              size === "large" ? "bg-gray-200 text-red-600" : "bg-gray-200 text-green-600"
            }`}>
            {size === "large" ? "L" : "M"}
          </span>
          <h3 className="font-bold text-xl text-gray-800 truncate max-w-30">{drink.name}</h3>
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
          <span className="text-xl text-black font-bold w-4 text-center">{drink.quantity}</span>
          <button
            onClick={() => onUpdateQty(drink.instanceId, 1)}
            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:bg-slate-200">
            +
          </button>
        </div>

        <p className="text-base tracking-wide font-normal text-gray-500">
          單價: ${drink.unitPrice}
        </p>
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
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-lg font-light leading-none cursor-pointer">×</span>
      </button>
    </div>
  );
}

function KpiCardLayout({ kpi }) {
  const { label, value, unit, trend, isPositive, color, icon } = kpi;

  return (
    <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-${color}-50`}>
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xl font-black ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          {isPositive ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-slate-500 font-bold text-2xl uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1">
          {unit === "$" && <span className="text-xl font-black text-slate-400">$</span>}
          <span className="text-4xl font-black text-slate-800">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit !== "$" && <span className="text-sm font-bold text-slate-400 ml-1">{unit}</span>}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50">
        <p className="text-[14px] text-slate-400 font-medium">
          對比昨日同時段:{" "}
          <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
            {isPositive ? "+" : "-"}
            {Math.abs(trend)}%
          </span>
        </p>
      </div>
    </div>
  );
}

export { CardLayout, MenuItemCardLayout, OrderItemCardLayout, KpiCardLayout };
