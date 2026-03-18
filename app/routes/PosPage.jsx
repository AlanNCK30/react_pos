import { useState } from "react";
import PosBar from "@/components/PosBar";
import { MenuItemCardLayout, OrderItemCardLayout } from "../layouts/CardLayout";
import { menuData, getDefaultConfig } from "@/data/items";
import dummy from "../assets/dummy.png";

function PosPage() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeDrink, setActiveDrink] = useState(null);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [cart, setCart] = useState([]);

  const handleItemClick = (item) => {
    setActiveDrink(item);
    setCurrentConfig(getDefaultConfig(item.opt_group_id));
  };

  const addToCart = () => {
    const orderItem = {
      ...activeDrink,
      config: currentConfig,
      instanceId: Date.now(),
    };
    setCart([...cart, orderItem]);
    setActiveDrink(null);
    console.log(orderItem);
  };

  const toggleAddon = (addon) => {
    const isSelected = currentConfig.addons.some((a) => a.id === addon.id);
    if (isSelected) {
      setCurrentConfig({
        ...currentConfig,
        addons: currentConfig.addons.filter((a) => a.id !== addon.id),
      });
    } else {
      setCurrentConfig({
        ...currentConfig,
        addons: [...currentConfig.addons, addon],
      });
    }
  };

  return (
    <div className="flex flex-col h-215 overflow-hidden bg-slate-50">
      <PosBar />
      {activeDrink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{activeDrink.name}</h2>
              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  大小選擇
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCurrentConfig({ ...currentConfig, size: "medium" })}
                    className={`py-4 rounded-2xl border-2 font-bold flex flex-col items-center transition-all ${
                      currentConfig?.size === "medium"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-100 text-slate-500"
                    }`}>
                    <span className="text-lg uppercase">中杯 (M)</span>
                    <span className="text-sm opacity-70">${activeDrink.medium}</span>
                  </button>
                  <button
                    onClick={() => setCurrentConfig({ ...currentConfig, size: "large" })}
                    className={`py-4 rounded-2xl border-2 font-bold flex flex-col items-center transition-all ${
                      currentConfig?.size === "large"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-100 text-slate-500"
                    }`}>
                    <span className="text-lg uppercase">大杯 (L)</span>
                    <span className="text-sm opacity-70">${activeDrink.large}</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  甜度選擇
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {menuData.optionGroups[activeDrink.opt_group_id]?.sweetness.map((s) => (
                    <button
                      key={s.level}
                      onClick={() => setCurrentConfig({ ...currentConfig, sweetness: s.level })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        currentConfig?.sweetness === s.level
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-100 text-slate-600 hover:bg-slate-50"
                      }`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  冰量選擇
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {menuData.optionGroups[activeDrink.opt_group_id]?.ice.map((i) => (
                    <button
                      key={i.level}
                      onClick={() => setCurrentConfig({ ...currentConfig, ice: i.level })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        currentConfig?.ice === i.level
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-100 text-slate-600 hover:bg-slate-50"
                      }`}>
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  配料選擇
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {menuData.optionGroups[activeDrink.opt_group_id]?.add_ons.map((addon) => {
                    const isSelected = currentConfig.addons.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-100 text-slate-600 hover:bg-slate-50"
                        }`}>
                        <span>{addon.item}</span>
                        <span className="text-[16px] opacity-60">+${addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveDrink(null)}
                  className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl">
                  取消
                </button>
                <button
                  onClick={addToCart}
                  className="flex-2 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-transform">
                  確認加入訂單
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden p-2 gap-4">
        <div className="flex-3 bg-chart-1 rounded-2xl shadow-sm border border-slate-200 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">所有飲品</h2>
            <div>
              {selectedCat && (
                <button
                  onClick={() => setSelectedCat(null)}
                  className="px-2 rounded text-xl bg-chart-2 text-black hover:bg-chart-3">
                  返回
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4">
            {!selectedCat
              ? menuData.menu_categories.map((cat) => {
                  return (
                    <MenuItemCardLayout
                      key={cat.id}
                      imagePath={cat.image_path}
                      name={cat.category_name}
                      callback={() => {
                        setSelectedCat(cat);
                      }}
                    />
                  );
                })
              : selectedCat.items.map((item) => {
                  return (
                    <MenuItemCardLayout
                      key={item.id}
                      imagePath={dummy}
                      name={item.name}
                      callback={() => {
                        handleItemClick(item);
                      }}
                    />
                  );
                })}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-md border border-emerald-100 overflow-hidden">
          <div className="p-4 bg-chart-2 border-b border-emerald-100">
            <h2 className="text-lg font-bold text-black">目前訂單</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-chart-1">
            {cart.map((drink) => (
              <OrderItemCardLayout
                key={drink.instanceId}
                drink={drink}
                onRemove={(id) => setCart((prev) => prev.filter((d) => d.instanceId !== id))}
              />
            ))}

            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <p className="text-sm">等待點餐中...</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-chart-1 border-t border-chart-5 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>總計</span>
              <span>$ 0.00</span>
            </div>
            <button className="w-full py-4 rounded-xl bg-chart-5 text-white text-xl font-bold shadow-lg transition-transform active:scale-95">
              結帳付款
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosPage;
