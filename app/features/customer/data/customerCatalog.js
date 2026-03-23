import dummyImage from "@/assets/dummy.png";
import { menuData } from "@/data/items";

import bubbleTeaImage from "../../../assets/dummy.png";
import coffeeImage from "../../../assets/dummy.png";
import toppingImage from "../../../assets/dummy.png";

const CATEGORY_VISUALS = {
  CAT_TEA: {
    image: bubbleTeaImage,
    description: "清爽茶底，適合想喝純茶的人。",
  },
  CAT_LATTE: {
    image: coffeeImage,
    description: "鮮奶比例更高，口感順口。",
  },
  CAT_PEARL: {
    image: bubbleTeaImage,
    description: "珍珠系招牌，口感最明顯。",
  },
  CAT_FRUIT: {
    image: bubbleTeaImage,
    description: "果香較重，整體更清爽。",
  },
  CAT_SPECIAL: {
    image: bubbleTeaImage,
    description: "門店特調，適合第一次點。",
  },
  CAT_PURE: {
    image: bubbleTeaImage,
    description: "茶味乾淨，負擔較輕。",
  },
  CAT_LATTE_PRO: {
    image: coffeeImage,
    description: "奶香更厚，適合偏濃口味。",
  },
  CAT_SEASON: {
    image: toppingImage,
    description: "限定口味，數量較少。",
  },
};

const fallbackVisual = {
  image: dummyImage,
  description: "依照目前 POS 菜單同步的系列。",
};

function getCategoryVisual(categoryId) {
  return CATEGORY_VISUALS[categoryId] ?? fallbackVisual;
}

const customerCategories = menuData.menu_categories.map((category) => {
  const visual = getCategoryVisual(category.id);
  const items = category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryName: category.category_name,

    image: visual.image,
  }));

  return {
    id: category.id,
    name: category.category_name,
    image: visual.image,
    description: visual.description,
    itemCount: items.length,
    startingPrice: Math.min(...items.map((item) => item.medium)),
    items,
  };
});

const customerStore = {
  id: "jige-tea-house",
  name: "基哥茶飲",

  description: "「就是這個味！」 ",
  heroImage: bubbleTeaImage,
  prepTime: "約 10 分鐘",
  serviceHours: "11:00 - 21:30",
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
