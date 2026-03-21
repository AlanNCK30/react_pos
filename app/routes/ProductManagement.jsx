import { menuData } from "@/data/items";
import { useState } from "react";

function ProductManagement() {
  const allItems = menuData.menu_categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category_name: cat.category_name,
      cat_id: cat.id,
    })),
  );
  const initialCatMap = {
    CAT_TEA: "茗茶系列",
    CAT_LATTE: "鮮奶茶系列",
    CAT_PEARL: "口感/珍珠系列",
    CAT_FRUIT: "新鮮果茶系列",
    CAT_SPECIAL: "特調系列",
    CAT_PURE: "原片冰茶系列",
    CAT_LATTE_PRO: "茶拿鐵系列",
    CAT_SEASON: "季節限定系列",
  };
  const [items, setItems] = useState(allItems);
  const [form, setForm] = useState({
    id: "",
    name: "",
    medium: "",
    large: "",
    cat: "CAT_TEA",
    newCatName: "",
    isNewCat: false,
    opt_group_id: "",
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [catMap, setCatMap] = useState(initialCatMap);

  const handleDelete = (id) => {
    if (window.confirm("⚠️ 確定要永久刪除此產品嗎？此操作無法復原。")) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const handleEditClick = (item) => {
    console.log(item);

    setEditingId(item.id);
    setForm({
      id: item.id,
      name: item.name,
      medium: item.medium,
      large: item.large,
      cat: item.cat_id,
      newCatName: "",
      isNewCat: false,
      opt_group_id: item.opt_group_id,
    });
    setToggleEdit(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    if (!form.name) {
      return alert("請輸入名稱");
    }

    let finalCatId = form.cat;
    let finalCatName = catMap[form.cat];

    if (form.isNewCat) {
      if (!form.newCatName) {
        return alert("請輸入新分類名稱");
      }
      finalCatId = `CAT_${Date.now()}`;
      finalCatName = form.newCatName;

      setCatMap((prev) => ({
        ...prev,
        [finalCatId]: finalCatName,
      }));
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: form.name,
                medium: Number(form.medium),
                large: Number(form.large),
                // cat: form.cat,
                cat_id: finalCatId,
                category_name: finalCatName,
              }
            : item,
        ),
      );
    } else {
      const newEntry = {
        ...form,
        id: form.id,
        medium: Number(form.medium),
        large: Number(form.large),
        cat_id: finalCatId,
        category_name: finalCatName,
      };
      setItems([newEntry, ...items]);
    }

    setEditingId(null);
    setForm({
      name: "",
      medium: "",
      large: "",
      cat: "CAT_TEA",
      opt_id: "",
      newCatName: "",
      isNewCat: false,
    });
    setToggleEdit(!toggleEdit);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 text-3xl rounded-xl text-black flex justify-between">
        <h2>產品管理</h2>
        <div>
          <button
            className={`bg-primary text-primary-foreground shadow-sm cursor-pointer mr-4 px-4 py-1.5 rounded-lg text-xl transition-all`}
            onClick={() => setToggleEdit(!toggleEdit)}>
            + 新增產品
          </button>
        </div>
      </div>

      <div className="w-11/12 rounded-2xl border border-slate-800 overflow-hidden m-auto">
        <table className="w-full">
          <thead className="bg-primary text-primary-foreground text-sm uppercase">
            <tr className="text-2xl font-bold">
              <th className="p-2">ID</th>
              <th>配料編號</th>
              <th>產品名稱</th>
              <th>系列</th>
              <th>中杯 (M)</th>
              <th>大杯 (L)</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors text-center text-xl">
                <td className="px-1">{item.id}</td>
                <td>{item.opt_group_id}</td>
                <td>{item.name}</td>
                <td>{item.category_name}</td>
                <td>${item.medium}</td>
                <td>${item.large}</td>
                <td>
                  <div className="flex gap-5 justify-center items-center">
                    <button
                      onClick={() => {
                        handleEditClick(item);
                      }}
                      className="bg-primary text-primary-foreground p-2 rounded-xl text-[18px] m-1 cursor-pointer">
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-primary text-primary-foreground p-2 rounded-xl text-[18px] cursor-pointer">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggleEdit && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-60 p-4 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl w-1/2 overflow-hidden animate-in zoom-in duration-200 h-150 flex flex-col justify-around items-center text-2xl">
            <div>
              <h1>{editingId ? "修改產品" : "新增產品"}</h1>
            </div>

            <div className="flex w-full px-8 items-center">
              <label htmlFor="isNewCat" className="w-32 shrink-0 text-right mr-4">
                建立分類:
              </label>
              <input
                type="checkbox"
                id="isNewCat"
                checked={form.isNewCat}
                onChange={(e) => setForm({ ...form, isNewCat: e.target.checked })}
                className="w-5 h-5 cursor-pointer accent-primary"
              />
            </div>

            <div className="flex w-full px-8 items-center">
              <label htmlFor="cat_id" className="w-32 shrink-0 text-right mr-4">
                產品系列:
              </label>
              {form.isNewCat ? (
                <input
                  type="text"
                  id="newCatName"
                  value={form.newCatName}
                  onChange={handleInputChange}
                  placeholder="請輸入新分類名稱"
                  className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
                />
              ) : (
                <select
                  name="cat"
                  id="cat"
                  value={form.cat}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500">
                  {Object.entries(catMap).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex w-full px-8 items-center">
              <label htmlFor="name" className="w-32 shrink-0 text-right mr-4">
                產品編號:{" "}
              </label>
              <input
                type="text"
                id="id"
                value={form.id}
                onChange={handleInputChange}
                placeholder="請輸入產品編號"
                className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-full px-8 items-center">
              <label htmlFor="name" className="w-32 shrink-0 text-right mr-4">
                產品名稱:{" "}
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="請輸入產品名稱"
                className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-full px-8 items-center">
              <label htmlFor="mPrice" className="w-32 shrink-0 text-right mr-4">
                中杯價錢:{" "}
              </label>
              <input
                type="number"
                id="medium"
                value={form.medium}
                onChange={handleInputChange}
                placeholder="請輸入中杯價錢"
                className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-full px-8 items-center">
              <label htmlFor="lPrice" className="w-32 shrink-0 text-right mr-4">
                大杯價錢:{" "}
              </label>
              <input
                type="text"
                id="large"
                value={form.large}
                onChange={handleInputChange}
                placeholder="請輸入大杯價錢"
                className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-full px-8 items-center">
              <label htmlFor="opt_id" className="w-32 shrink-0 text-right mr-4">
                配料編號:{" "}
              </label>
              <input
                type="text"
                id="opt_group_id"
                value={form.opt_group_id}
                onChange={handleInputChange}
                placeholder="請輸入配料編號"
                className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus-ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-10 mt-4 w-full justify-center items-center">
              <button
                className=" bg-gray-100 p-3 rounded-md font-bold cursor-pointer"
                onClick={() => {
                  setToggleEdit(!toggleEdit);
                  setEditingId(null);
                  setForm({
                    name: "",
                    medium: "",
                    large: "",
                    cat: "CAT_TEA",
                    opt_id: "",
                  });
                }}>
                取消
              </button>
              <button
                onClick={() => handleSave()}
                className=" bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-700 transition-colors cursor-pointer">
                {editingId ? "儲存修改" : "確認新增"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
