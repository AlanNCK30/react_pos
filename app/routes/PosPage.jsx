import { useState, useEffect, useRef } from "react";
import PosBar from "@/components/PosBar";
import { MenuItemCardLayout, OrderItemCardLayout } from "../layouts/CardLayout";
import { menuData, getDefaultConfig } from "@/data/items";
import dummy from "../assets/dummy.png";
import Cash from "../assets/cash.png";
import Octopus from "../assets/octopus.jpg";
import Master from "../assets/master.svg";
import WeChat from "../assets/wechat_pay.svg";
import Alipay from "../assets/alipay.svg";
import PayMe from "../assets/PayMe.svg";

function PosPage() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeDrink, setActiveDrink] = useState(null);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cartEndRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  useEffect(() => {
    scrollToBottom();
  }, [cart]);

  const displayTitle = selectedCat ? selectedCat.category_name : "所有飲品";
  const isCartEmpty = cart.length === 0;

  const allItems = menuData.menu_categories.flatMap((cat) => cat.items);

  const filteredItems = allItems.filter((item) => {
    const search = searchTerm.toLowerCase();
    return item.id.toLowerCase().includes(search) || item.name.toLowerCase().includes(search);
  });

  const grandTotal = cart
    .reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    .toFixed(2);

  const handleItemClick = (item) => {
    setActiveDrink(item);
    setCurrentConfig(getDefaultConfig(item.opt_group_id));
    console.log(selectedCat);
  };

  const addToCart = () => {
    const basePrice = currentConfig.size === "large" ? activeDrink.large : activeDrink.medium;

    const addonsTotal = currentConfig.addons.reduce((sum, addon) => sum + addon.price, 0);
    const unitPrice = basePrice + addonsTotal;

    const orderItem = {
      ...activeDrink,
      config: { ...currentConfig },
      instanceId: Date.now(),
      unitPrice: unitPrice,
      quantity: 1,
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

  const updateQuantity = (instanceId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.instanceId === instanceId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const scrollToBottom = () => {
    cartEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearCart = () => {
    if (cart.length > 0 && window.confirm("⚠️ 確定要清空目前訂單並重置嗎？")) {
      setCart([]);
      setSelectedCat(null);
    }
  };

  const proceedToPayment = () => {
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  const completeTransaction = (method) => {
    setPaymentType(method);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setSelectedCat(null);
    alert(`付款成功 (${method})！請取收據。`);
  };

  return (
      <div className="flex flex-col h-215 overflow-hidden bg-slate-50">
          <PosBar
              cartCount={cart.length}
              onClearCart={handleClearCart}
              onResetMenu={() => setSelectedCat(null)}
              onSearch={(value) => setSearchTerm(value)}
          />
          {/* POPUP */}
          {isCheckoutOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-60 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
                      <div className="bg-primary text-primary-foreground p-6 text-center">
                          <h2 className="text-2xl text-muted/90 font-black">確認訂單內容</h2>
                          <p className="text-muted/70 font-bold text-base mt-1 tracking-widestpro">
                              請與顧客核對飲品及客製化選項
                          </p>
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto p-6 space-y-4 bg-slate-50">
                          {cart.map((item) => (
                              <div
                                  key={item.instanceId}
                                  className="flex justify-between items-start border-b border-slate-200 pb-3"
                              >
                                  <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                          <span className="text-sm bg-slate-800 text-white px-2 py-1 rounded font-black">
                                              {item.config.size === "large" ? "L" : "M"}
                                          </span>
                                          <span className="font-bold text-slate-800 text-xl tracking-wider">
                                              {item.name}
                                          </span>
                                          <span className="bg-primary text-muted/90 text-lg font-medium px-2 py-0.5 rounded-sm">
                                              x{item.quantity}
                                          </span>
                                      </div>
                                      <p className="text-xs text-black">
                                          {item.config.sweetness}% / {item.config.ice}
                                          {item.config.addons.length > 0 &&
                                              ` + ${item.config.addons.map((a) => a.item).join(", ")}`}
                                      </p>
                                  </div>
                                  {item.quantity > 1 && (
                                      <div className="text-[14px] text-slate-400">
                                          ${item.unitPrice} / 杯
                                      </div>
                                  )}
                                  <span className="font-bold text-slate-700">
                                      $ {(item.unitPrice * item.quantity).toFixed(1)}
                                  </span>
                              </div>
                          ))}
                      </div>
                      <div className="p-6 bg-white border-t border-slate-100">
                          <div className="flex justify-between items-center mb-6">
                              <span className="text-slate-500/95 font-medium tracking-widest">
                                  應付金額
                              </span>
                              <span className="text-3xl font-black text-slate-800/95">
                                  $ {grandTotal}
                              </span>
                          </div>
                          <div className="flex gap-4">
                              <button
                                  onClick={() => setIsCheckoutOpen(false)}
                                  className="flex-1 py-4 rounded-2xl bg-slate-200 text-slate-500 font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                              >
                                  返回修改
                              </button>
                              <button
                                  onClick={proceedToPayment}
                                  className="flex-2 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                              >
                                  確認收款 / 列印標籤
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
          {/* POPUP */}
          {activeDrink && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
                      <div className="p-6">
                          <h2 className="text-2xl font-bold text-slate-800 mb-6">
                              {activeDrink.name}
                          </h2>
                          <div className="space-y-2 mb-4">
                              <p className="text-base font-medium text-slate-500 uppercase tracking-widestpro">
                                  大小選擇
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                  <button
                                      onClick={() =>
                                          setCurrentConfig({ ...currentConfig, size: "medium" })
                                      }
                                      className={`py-4 rounded-2xl border-2 font-bold flex flex-col items-center transition-all ${
                                          currentConfig?.size === "medium"
                                              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                              : "border-slate-100 text-slate-500"
                                      }`}
                                  >
                                      <span className="text-lg uppercase">中杯 (M)</span>
                                      <span className="text-md opacity-70">
                                          ${activeDrink.medium}
                                      </span>
                                  </button>
                                  <button
                                      onClick={() =>
                                          setCurrentConfig({ ...currentConfig, size: "large" })
                                      }
                                      className={`py-4 rounded-2xl border-2 font-bold flex flex-col items-center transition-all ${
                                          currentConfig?.size === "large"
                                              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                              : "border-slate-100 text-slate-500"
                                      }`}
                                  >
                                      <span className="text-lg uppercase">大杯 (L)</span>
                                      <span className="text-md opacity-70">
                                          ${activeDrink.large}
                                      </span>
                                  </button>
                              </div>
                          </div>
                          <div className="space-y-2 mb-4">
                              <p className="text-base font-medium text-slate-500 uppercase tracking-widestpro">
                                  甜度選擇
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                  {menuData.optionGroups[activeDrink.opt_group_id]?.sweetness.map(
                                      (s) => (
                                          <button
                                              key={s.level}
                                              onClick={() =>
                                                  setCurrentConfig({
                                                      ...currentConfig,
                                                      sweetness: s.level,
                                                  })
                                              }
                                              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                                                  currentConfig?.sweetness === s.level
                                                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                      : "border-slate-100 text-slate-600 hover:bg-slate-50"
                                              }`}
                                          >
                                              {s.label}
                                          </button>
                                      )
                                  )}
                              </div>
                          </div>
                          <div className="space-y-3 mb-8">
                              <p className="text-base font-medium text-slate-500 uppercase tracking-widestpro">
                                  冰量選擇
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                  {menuData.optionGroups[activeDrink.opt_group_id]?.ice.map((i) => (
                                      <button
                                          key={i.level}
                                          onClick={() =>
                                              setCurrentConfig({ ...currentConfig, ice: i.level })
                                          }
                                          className={`py-3 rounded-xl border-2 font-bold transition-all ${
                                              currentConfig?.ice === i.level
                                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                  : "border-slate-100 text-slate-600 hover:bg-slate-50"
                                          }`}
                                      >
                                          {i.label}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          <div className="space-y-3 mb-8">
                              <p className="text-base font-medium text-slate-500 uppercase tracking-widestpro">
                                  配料選擇
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                  {menuData.optionGroups[activeDrink.opt_group_id]?.add_ons.map(
                                      (addon) => {
                                          const isSelected = currentConfig.addons.some(
                                              (a) => a.id === addon.id
                                          );
                                          return (
                                              <button
                                                  key={addon.id}
                                                  onClick={() => toggleAddon(addon)}
                                                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                                                      isSelected
                                                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                          : "border-slate-100 text-slate-700 hover:bg-slate-50"
                                                  }`}
                                              >
                                                  <span>{addon.item}</span>
                                                  <span className="text-base text-slate-600 opacity-60">
                                                      +${addon.price}
                                                  </span>
                                              </button>
                                          );
                                      }
                                  )}
                              </div>
                          </div>
                          <div className="flex gap-3">
                              <button
                                  onClick={() => setActiveDrink(null)}
                                  className="flex-1 py-4 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl ring ring-slate-200"
                              >
                                  取消
                              </button>
                              <button
                                  onClick={addToCart}
                                  className="flex-2 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
                              >
                                  確認加入訂單
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
          {/* POPUP */}
          {isPaymentOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-60 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="p-8 text-center">
                          <p className="text-slate-500 font-medium uppercase tracking-widestpro text-base mb-2 bg-white/10">
                              應付金額
                          </p>
                          <h2 className="text-4xl font-black text-slate-800 mb-8">${grandTotal}</h2>

                          <div className="grid grid-cols-2 gap-4">
                              {[
                                  {
                                      id: "CASH",
                                      label: "Cash",
                                      icon: Cash,
                                      color: "bg-orange-50 text-orange-600 border-orange-100",
                                  },
                                  {
                                      id: "OCTOPUS",
                                      label: "Octopus",
                                      icon: Octopus,
                                      color: "bg-blue-50 text-blue-600 border-blue-100",
                                  },
                                  {
                                      id: "ALIPAY",
                                      label: "Alipay",
                                      icon: Alipay,
                                      color: "bg-sky-50 text-sky-600 border-sky-100",
                                  },
                                  {
                                      id: "WECHAT",
                                      label: "WeChat Pay",
                                      icon: WeChat,
                                      color: "bg-green-50 text-green-600 border-green-100",
                                  },
                                  {
                                      id: "CREDIT",
                                      label: "Credit Card",
                                      icon: Master,
                                      color: "bg-slate-50 text-slate-600 border-slate-100",
                                  },
                                  {
                                      id: "PAYME",
                                      label: "PayMe",
                                      icon: PayMe,
                                      color: "bg-red-50 text-red-600 border-red-100",
                                  },
                              ].map((m) => (
                                  <button
                                      key={m.id}
                                      onClick={() => completeTransaction(m.label)}
                                      className={`flex flex-col items-center justify-around p-6 rounded-2xl border-2 text-xl transition-all active:scale-95 ${m.color} hover:shadow-md`}
                                  >
                                      <img src={`${m.icon}`} alt="payment method" />
                                      <h3>{m.label}</h3>
                                  </button>
                              ))}
                          </div>

                          <button
                              onClick={() => {
                                  setIsPaymentOpen(false);
                                  setIsCheckoutOpen(true);
                              }}
                              className="mt-8 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                          >
                              ← 返回修改訂單
                          </button>
                      </div>
                  </div>
              </div>
          )}

          <div className="flex flex-1 overflow-hidden bg-background/5 gap-2 px-2">
              <div className="flex flex-col flex-3 h-full rounded-xl shadow-xl border border-background shadow-muted bg-primary/85 ring-slate-500 mt-2 ">
                  <div className="flex justify-between items-center my-auto  mb-2 px-2 py-2 bg-background/70  border-t border-background/85 ring-2 ring-background/80 shadow-[0_10px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.05)] rounded-t-xl ">
                      <div className="text-2xl font-bold text-primary/90 tracking-widest ">
                          {displayTitle}
                      </div>

                      {selectedCat && (
                          <button
                              onClick={() => setSelectedCat(null)}
                              className="px-10 text-2xl ring ring-ring/50 rounded-2xl text-primary-foreground/80 bg-secondary-foreground/80 
                              hover:bg-secondary-foreground hover:text-primary-foreground dark:hover:bg-primary dark:bg-secondary-foreground/20 dark:hover:text-primary-foreground cursor-pointer"
                          >
                              返回
                          </button>
                      )}
                  </div>
                  {/* TODO item center */}
                  <div
                      className="grid grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-2 xl:gap-4 overflow-y-auto transition-all duration-300 flex-auto px-2 items-start mt-2
                  "
                  >
                      {searchTerm !== ""
                          ? filteredItems.map((item) => (
                                <MenuItemCardLayout
                                    key={item.id}
                                    name={item.name}
                                    imagePath={dummy}
                                    callback={() => handleItemClick(item)}
                                />
                            ))
                          : !selectedCat
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
              <div className="flex-1 flex flex-col h-full rounded-xl shadow-xl border border-background shadow-muted bg-primary/85 ring-slate-500 mt-2">
                  <div className="my-auto px-2 py-2 bg-background/80  border-t border-background/85 ring-2 ring-background/80 shadow-[0_10px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.05)] rounded-t-xl ">
                      <h2 className="text-2xl font-bold text-primary/90 tracking-widest">
                          目前訂單
                      </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto py-2 space-y-3 bg-primary/80 ">
                      {cart.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-slate-300">
                              <p className="text-muted text-base ">等待點餐中...</p>
                          </div>
                      ) : (
                          <div>
                              {cart.map((drink) => (
                                  <OrderItemCardLayout
                                      key={drink.instanceId}
                                      drink={drink}
                                      onUpdateQty={updateQuantity}
                                      onRemove={(id) =>
                                          setCart((prev) => prev.filter((d) => d.instanceId !== id))
                                      }
                                  />
                              ))}
                              <div ref={cartEndRef}></div>
                          </div>
                      )}
                  </div>
                  <div className="p-4 bg-primary/10 border-t-2 border-muted/80 space-y-3">
                      <div className="flex justify-between text-lg font-bold text-primary-foreground">
                          <span className="text-base  font-normal tracking-wide text-muted">
                              總計
                          </span>
                          <span className="text-xl tracking-wide text-muted font-normal ">
                              $ {grandTotal}
                          </span>
                      </div>
                      <button
                          onClick={() => setIsCheckoutOpen(true)}
                          disabled={isCartEmpty}
                          className={`w-full py-4 rounded-xl  text-black text-xl font-bold  transition-transform  ${
                              isCartEmpty
                                  ? "bg-slate-300 text-slate-400 cursor-not-allowed"
                                  : "bg-chart-1 text-black cursor-pointer active:scale-95 inset-shadow-sm inset-shadow-gray-700 "
                          }`}
                      >
                          {isCartEmpty ? "請先點餐" : "結帳付款"}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default PosPage;
