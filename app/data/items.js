import dummy from "../assets/dummy.png";

const menuData = {
  menu_categories: [
    {
      id: "CAT_TEA",
      category_name: "茗茶系列",
      image_path: dummy,
      items: [
        {
          id: "TEA_1",
          name: "913茶王",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
        {
          id: "TEA_2",
          name: "御選綠茶",
          medium: 18,
          large: 20,
          opt_group_id: "STD_TEA",
        },
        {
          id: "TEA_3",
          name: "凍頂烏龍茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_LATTE",
      category_name: "鮮奶茶系列",
      image_path: dummy,
      items: [
        {
          id: "LAT_1",
          name: "913鮮奶茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
        {
          id: "LAT_2",
          name: "珍珠鮮奶茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_PEARL",
      category_name: "口感/珍珠系列",
      image_path: dummy,
      items: [
        {
          id: "PRL_1",
          name: "珍珠奶茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
        {
          id: "PRL_2",
          name: "珍珠奶綠",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
        {
          id: "PRL_3",
          name: "蜂蜜珍珠普洱奶茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_FRUIT",
      category_name: "新鮮果茶系列",
      image_path: dummy,
      items: [
        {
          id: "FRU_1",
          name: "香橙綠茶",
          medium: 20,
          large: 22,
          opt_group_id: "FRU_TEA",
        },
        {
          id: "FRU_2",
          name: "葡萄柚綠茶",
          medium: 20,
          large: 22,
          opt_group_id: "FRU_TEA",
        },

        {
          id: "FRU_3",
          name: "檸檬紅茶",
          medium: 20,
          large: 22,
          opt_group_id: "FRU_TEA",
        },
      ],
    },
    {
      id: "CAT_SPECIAL",
      category_name: "特調系列",
      image_path: dummy,
      items: [
        {
          id: "SPC_1",
          name: "913奶茶",
          medium: 22,
          large: 24,
          opt_group_id: "STD_TEA",
        },
        {
          id: "SPC_2",
          name: "蜂蜜綠茶",
          medium: 20,
          large: 22,
          opt_group_id: "STD_TEA",
        },
        {
          id: "SPC_3",
          name: "黑糖珍珠奶茶",
          medium: 26,
          large: 28,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_PURE",
      category_name: "原片冰茶系列",
      image_path: dummy,
      items: [
        {
          id: "PUR_1",
          name: "特級茉莉綠茶",
          medium: 18,
          large: 20,
          opt_group_id: "STD_TEA",
        },
        {
          id: "PUR_2",
          name: "阿薩姆紅茶",
          medium: 18,
          large: 20,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_LATTE_PRO",
      category_name: "茶拿鐵系列",
      image_path: dummy,
      items: [
        {
          id: "LTP_1",
          name: "紅茶拿鐵",
          medium: 26,
          large: 28,
          opt_group_id: "STD_TEA",
        },
        {
          id: "LTP_2",
          name: "炓烏龍拿鐵",
          medium: 28,
          large: 30,
          opt_group_id: "STD_TEA",
        },
        {
          id: "LTP_3",
          name: "抹茶拿鐵",
          medium: 30,
          large: 32,
          opt_group_id: "STD_TEA",
        },
      ],
    },
    {
      id: "CAT_SEASON",
      category_name: "季節限定系列",
      image_path: dummy,
      items: [
        {
          id: "SEA_1",
          name: "鮮莓綠茶",
          medium: 34,
          large: 36,
          opt_group_id: "FRU_TEA",
        },
        {
          id: "SEA_2",
          name: "芒果綠茶冰沙",
          medium: 36,
          large: 38,
          opt_group_id: "FRU_TEA", // 冰沙通常不可加熱，可透過此 opt_group 控制
        },
      ],
    },
  ],
  optionGroups: {
    STD_TEA: {
      sweetness: [
        { level: 100, label: "正常", is_default: true },
        { level: 90, label: "九分甜" },
        { level: 70, label: "少甜" },
        { level: 50, label: "半甜" },
        { level: 30, label: "微甜" },
        { level: 0, label: "無糖" },
      ],
      ice: [
        { level: "NORMAL", label: "正常", is_default: true },
        { level: "EASY", label: "少冰" },
        { level: "LITTLE", label: "微冰" },
        { level: "NONE", label: "去冰" },
        { level: "HOT", label: "熱" },
      ],
      add_ons: [
        { id: "ADD_1", item: "珍珠", price: 4 },
        { id: "ADD_2", item: "仙草", price: 4 },
        { id: "ADD_3", item: "愛玉", price: 6 },
        { id: "ADD_4", item: "紅豆", price: 6 },
      ],
    },
    FRU_TEA: {
      sweetness: [
        { level: 100, label: "正常", is_default: true },
        { level: 90, label: "九分甜" },
        { level: 70, label: "少甜" },
        { level: 50, label: "半甜" },
        { level: 30, label: "微甜" },
        { level: 0, label: "無糖" },
      ],
      ice: [
        { level: "NORMAL", label: "正常", is_default: true },
        { level: "EASY", label: "少冰" },
        { level: "LITTLE", label: "微冰" },
        { level: "NONE", label: "去冰" },
        { level: "HOT", label: "熱" },
      ],
      add_ons: [
        { id: "ADD_1", item: "珍珠", price: 4 },
        { id: "ADD_2", item: "仙草", price: 4 },
        { id: "ADD_3", item: "愛玉", price: 6 },
        { id: "ADD_4", item: "紅豆", price: 6 },
      ],
    },
  },
};

function getDefaultConfig(groupId) {
  const group = menuData.optionGroups[groupId];
  return {
    size: "medium",
    sweetness: group.sweetness.find((s) => s.is_default)?.level,
    ice: group.ice.find((i) => i.is_default)?.level,
    addons: [],
  };
}

export { menuData, getDefaultConfig };
