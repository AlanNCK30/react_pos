import dummyImage from "@/assets/dummy.png";
import { menuData } from "@/data/items"; // prodect item
import { CATEGORY_DESCRIPTIONS } from "@/data/catalog_desc"; // category_desc


function getCategoryDescription(categoryId) {
  return CATEGORY_DESCRIPTIONS[categoryId];
}

// get item(product) data, map 
const customerCategories = menuData.menu_categories.map((category) => {
  const description = getCategoryDescription(category.id);
  const items = category.items.map((item) => ({
    ...item,
    categoryName: category.category_name,
    image: category.image_path,
  }));

  return {
    id: category.id,
    name: category.category_name,
    image: category.image_path,
    description,
    startingPrice: Math.min(...items.map((item) => item.medium)),
    items,
  };
});

const customerStore = {
  name: "基哥茶飲",
  description: "「就是這個味！」 ",
  heroImage: dummyImage,
  prepTime: "10",
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
