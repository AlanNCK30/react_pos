import dummyImage from "@/assets/dummy.png";
import { menuData } from "@/data/items";

const CATEGORY_DESCRIPTIONS = {
  CAT_TEA: "清爽茶底，適合想喝純茶的人。",
  CAT_LATTE: "鮮奶比例更高，口感順口。",
  CAT_PEARL: "珍珠系招牌，口感最明顯。",
  CAT_FRUIT: "果香較重，整體更清爽。",
  CAT_SPECIAL: "門店特調，適合第一次點。",
  CAT_PURE: "茶味乾淨，負擔較輕。",
  CAT_LATTE_PRO: "奶香更厚，適合偏濃口味。",
  CAT_SEASON: "限定口味，數量較少。",
};

function getCategoryDescription(categoryId) {
  return CATEGORY_DESCRIPTIONS[categoryId] ?? "依照目前 POS 菜單同步的系列。";
}

const customerCategories = menuData.menu_categories.map((category) => {
  const description = getCategoryDescription(category.id);
  const items = category.items.map((item) => ({
    ...item,
    categoryName: category.category_name,
    image: dummyImage,
  }));

  return {
    id: category.id,
    name: category.category_name,
    image: dummyImage,
    description,
    startingPrice: Math.min(...items.map((item) => item.medium)),
    items,
  };
});

const customerStore = {
  name: "基哥茶飲",
  description: "「就是這個味！」 ",
  heroImage: dummyImage,
  prepTime: "約 10 分鐘",
  serviceHours: "11:00 - 21:30",
  notice: "價格與客製選項已同步目前 POS 菜單。",
};

export function normalizeCustomerCategoryId(categoryId) {
  if (!categoryId) return "all";
  return customerCategories.some((category) => category.id === categoryId) ? categoryId : "all";
}

export function getCustomerMenuSections(selectedCategoryId = "all", searchTerm = "") {
  const normalizedCategoryId = normalizeCustomerCategoryId(selectedCategoryId);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return customerCategories
    .filter((category) => normalizedCategoryId === "all" || category.id === normalizedCategoryId)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (!normalizedSearch) return true;
        return (
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.id.toLowerCase().includes(normalizedSearch) ||
          category.name.toLowerCase().includes(normalizedSearch)
        );
      }),
    }))
    .filter((category) => category.items.length > 0);
}

export { customerCategories, customerStore };
