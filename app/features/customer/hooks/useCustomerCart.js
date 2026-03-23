import { useEffect, useState } from "react";

import { menuData } from "@/data/items";

const CUSTOMER_CART_STORAGE_KEY = "boba_pos_customer_cart";

function getOptionGroup(groupId) {
  return (
    menuData.optionGroups[groupId] ?? {
      sweetness: [],
      ice: [],
      add_ons: [],
    }
  );
}

function getSelectionLabel(options, value) {
  return options.find((option) => option.level === value)?.label ?? String(value);
}

function normalizeAddons(addons = []) {
  return [...addons]
    .map((addon) => ({
      id: addon.id,
      item: addon.item,
      price: Number(addon.price),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function createLineId(item, config) {
  const addonKey = normalizeAddons(config.addons)
    .map((addon) => addon.id)
    .join("+");

  return [item.id, config.size, config.sweetness, config.ice, addonKey || "no-addon"].join("__");
}

export function calculateConfiguredUnitPrice(item, config) {
  const basePrice = config.size === "large" ? item.large : item.medium;
  const addonsTotal = normalizeAddons(config.addons).reduce((sum, addon) => sum + addon.price, 0);

  return basePrice + addonsTotal;
}

export function formatConfiguredLine(line) {
  const addonNames = Array.isArray(line.addons) ? line.addons.map((addon) => addon.item) : [];
  const parts = [line.sizeLabel, line.sweetnessLabel, line.iceLabel];

  if (addonNames.length > 0) {
    parts.push(addonNames.join("、"));
  }

  return parts.join(" · ");
}

function buildCartLine(item, config) {
  const optionGroup = getOptionGroup(item.opt_group_id);
  const addons = normalizeAddons(config.addons);

  return {
    lineId: createLineId(item, config),
    itemId: item.id,
    itemName: item.name,
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    quantity: 1,
    size: config.size,
    sizeLabel: config.size === "large" ? "大杯 (L)" : "中杯 (M)",
    sweetness: config.sweetness,
    sweetnessLabel: getSelectionLabel(optionGroup.sweetness, config.sweetness),
    ice: config.ice,
    iceLabel: getSelectionLabel(optionGroup.ice, config.ice),
    addons,
    unitPrice: calculateConfiguredUnitPrice(item, config),
  };
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.sessionStorage.getItem(CUSTOMER_CART_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    return Array.isArray(parsedValue)
      ? parsedValue.filter((line) => line && typeof line === "object" && line.lineId)
      : [];
  } catch (error) {
    console.error("Unable to parse customer cart.", error);
    return [];
  }
}

function writeStoredCart(lines) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(CUSTOMER_CART_STORAGE_KEY, JSON.stringify(lines));
}

export function useCustomerCart() {
  const [lines, setLines] = useState(() => readStoredCart());

  useEffect(() => {
    writeStoredCart(lines);
  }, [lines]);

  function addLine(item, config) {
    const nextLine = buildCartLine(item, config);

    setLines((currentLines) => {
      const existingLine = currentLines.find((line) => line.lineId === nextLine.lineId);

      if (!existingLine) {
        return [...currentLines, nextLine];
      }

      return currentLines.map((line) =>
        line.lineId === nextLine.lineId
          ? {
              ...line,
              quantity: line.quantity + 1,
            }
          : line
      );
    });
  }

  function updateQuantity(lineId, nextQuantity) {
    setLines((currentLines) => {
      const safeQuantity = Math.max(0, Math.floor(nextQuantity));

      if (safeQuantity === 0) {
        return currentLines.filter((line) => line.lineId !== lineId);
      }

      return currentLines.map((line) =>
        line.lineId === lineId
          ? {
              ...line,
              quantity: safeQuantity,
            }
          : line
      );
    });
  }

  function removeLine(lineId) {
    setLines((currentLines) => currentLines.filter((line) => line.lineId !== lineId));
  }

  function clearCart() {
    setLines([]);
  }

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  return {
    lines,
    itemCount,
    subtotal,
    addLine,
    updateQuantity,
    removeLine,
    clearCart,
  };
}
