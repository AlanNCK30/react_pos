import { menuData } from "@/data/items";
import { MenuItemCardLayout } from "@/layouts/CardLayout";
import dummy from "../assets/dummy.png";
import { useState } from "react";

function ProductCatalog() {
  const allItems = menuData.menu_categories.flatMap((cat) => cat.items);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [soldOutIds, setSoldOutIds] = useState([]);
  const [recommandIds, setRecommandIds] = useState([]);
  const [viewMode, setViewMode] = useState("all");

  const changeSoldOut = (id) => {
    setSoldOutIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const changeRecommand = (id) => {
    setRecommandIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const toggleCategorySoldOut = (cat) => {
    const itemIds = cat.items.map((item) => item.id);
    const isAllSoldOut = itemIds.every((id) => soldOutIds.includes(id));
    if (isAllSoldOut) {
      setSoldOutIds((prev) => prev.filter((id) => !itemIds.includes(id)));
    } else {
      setSoldOutIds((prev) => [...new Set([...prev, ...itemIds])]);
    }
  };

  const toggleCategoryRemmonmmand = (cat) => {
    const itemIds = cat.items.map((item) => item.id);
    const isAllRecommand = itemIds.every((id) => recommandIds.includes(id));
    if (isAllRecommand) {
      setRecommandIds((prev) => prev.filter((id) => !itemIds.includes(id)));
    } else {
      setRecommandIds((prev) => [...new Set([...prev, ...itemIds])]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 text-3xl rounded-xl text-black flex justify-between">
        <h2>產品總覽</h2>
        <div>
          <button
            className={`cursor-pointer mr-4 px-4 py-1.5 rounded-lg text-xl transition-all ${viewMode === "all" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400"}`}
            onClick={() => setViewMode("all")}>
            顯示全部
          </button>
          <button
            className={`cursor-pointer px-4 py-1.5 rounded-lg text-xl transition-all ${viewMode === "category" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400"}`}
            onClick={() => setViewMode("category")}>
            按分類
          </button>
        </div>
      </div>

      <div>
        {viewMode === "all" ? (
          <div className="w-full h-auto grid grid-cols-4 auto-cols-auto auto-rows-auto gap-4 p-4">
            {allItems.map((item) => {
              const isSoldOut = soldOutIds.includes(item.id);
              const isRecommand = recommandIds.includes(item.id);
              return (
                <MenuItemCardLayout
                  key={item.id}
                  imagePath={dummy}
                  name={item.name}
                  children={"點擊查看詳情"}
                  callback={() => {
                    setSelectedProduct(item);
                  }}
                  isRecommand={isRecommand}
                  isSoldOut={isSoldOut}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-auto grid grid-cols-4 auto-cols-auto auto-rows-auto gap-4 p-4">
            {menuData.menu_categories.map((cat) => {
              const isSoldOut = soldOutIds.includes(cat.id);
              const isRecommand = recommandIds.includes(cat.id);
              return (
                <MenuItemCardLayout
                  key={cat.id}
                  imagePath={dummy}
                  name={cat.category_name}
                  children={"點擊查看詳情"}
                  callback={() => {
                    setSelectedCat(cat);
                  }}
                  isSoldOut={isSoldOut}
                  isRecommand={isRecommand}
                />
              );
            })}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div
          key={selectedProduct.id}
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 transition-transform duration-300 transform ${selectedProduct ? "translate-x-0" : "translate-x-full"}  force-slide-in`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">產品詳情</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl">
                ×
              </button>
            </div>

            <img
              src={dummy}
              alt={selectedProduct.name}
              className="w-full h-48 object-contain rounded-xl mb-4"
            />

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">產品名稱</label>
                <p className="text-lg font-bold text-slate-800">{selectedProduct.name}</p>
                <p className="text-xs text-slate-400">ID: {selectedProduct.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <label className="text-[10px] font-bold text-slate-400 block">中杯 (M)</label>
                  <span className="font-bold text-emerald-600">${selectedProduct.medium}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <label className="text-[10px] font-bold text-slate-400 block">大杯 (L)</label>
                  <span className="font-bold text-emerald-600">${selectedProduct.large}</span>
                </div>
              </div>

              {/* 營運開關：售罄狀態 */}
              <div className="flex flex-col gap-4">
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-slate-700">供應狀態</span>
                  <button
                    onClick={() => changeSoldOut(selectedProduct.id)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-sm cursor-pointer">
                    {soldOutIds.includes(selectedProduct.id) ? "暫停供應" : "供應中"}
                  </button>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-slate-700">基哥推薦</span>
                  <button
                    onClick={() => changeRecommand(selectedProduct.id)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-sm cursor-pointer">
                    {recommandIds.includes(selectedProduct.id) ? "是" : "否"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCat && (
        <div
          key={selectedCat.id}
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 transition-transform duration-300 transform ${selectedCat ? "translate-x-0" : "translate-x-full"}  force-slide-in`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">系列詳情</h2>
              <button
                onClick={() => setSelectedCat(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl">
                ×
              </button>
            </div>

            <img
              src={dummy}
              alt={selectedCat.category_name}
              className="w-full h-48 object-contain rounded-xl mb-4"
            />

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">系列名稱</label>
                <p className="text-lg font-bold text-slate-800">{selectedCat.category_name}</p>
                <p className="text-xs text-slate-400">ID: {selectedCat.id}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-slate-700">供應狀態</span>
                  <button
                    onClick={() => {
                      changeSoldOut(selectedCat.id);
                      toggleCategorySoldOut(selectedCat);
                    }}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-sm cursor-pointer">
                    {soldOutIds.includes(selectedCat.id) ? "暫停供應" : "供應中"}
                  </button>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-bold text-slate-700">基哥推薦</span>
                  <button
                    onClick={() => {
                      changeRecommand(selectedCat.id);
                      toggleCategoryRemmonmmand(selectedCat);
                    }}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-sm cursor-pointer">
                    {recommandIds.includes(selectedCat.id) ? "是" : "否"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
