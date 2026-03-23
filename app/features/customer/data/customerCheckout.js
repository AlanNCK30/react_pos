import AlipayIcon from "@/assets/alipay.svg";
import MasterIcon from "@/assets/master.svg";
import OctopusIcon from "@/assets/octopus.jpg";
import PayMeIcon from "@/assets/PayMe.svg";
import WeChatIcon from "@/assets/wechat_pay.svg";

const CUSTOMER_CHECKOUT_RESULT_STORAGE_KEY = "boba_pos_customer_checkout_result";

const customerPromotionOptions = [
  {
    id: "NONE",
    title: "不使用優惠",
    description: "按原價結算。",
  },
  {
    id: "BIRTHDAY_20",
    title: "會員生日優惠",
    description: "單筆折抵 HK$20。",
  },
  {
    id: "LUNCH_12",
    title: "午市快閃優惠",
    description: "午市時段折抵 HK$12。",
  },
  {
    id: "MEMBER_10PCT",
    title: "會員折扣",
    description: "全單九折，最多折抵 HK$30。",
  },
];

const customerPaymentMethods = [
  {
    id: "OCTOPUS",
    label: "八達通",
    icon: OctopusIcon,
  },
  {
    id: "ALIPAY",
    label: "支付寶",
    icon: AlipayIcon,
  },
  {
    id: "WECHAT",
    label: "微信支付",
    icon: WeChatIcon,
  },
  {
    id: "CREDIT",
    label: "信用卡",
    icon: MasterIcon,
  },
  {
    id: "PAYME",
    label: "PayMe",
    icon: PayMeIcon,
  },
];

function clampCurrency(value) {
  return Math.max(0, Number(value.toFixed(2)));
}

export function getPromotionById(promotionId) {
  return (
    customerPromotionOptions.find((promotion) => promotion.id === promotionId) ??
    customerPromotionOptions[0]
  );
}

export function getPaymentMethodById(paymentMethodId) {
  return customerPaymentMethods.find((paymentMethod) => paymentMethod.id === paymentMethodId) ?? null;
}

export function calculatePromotionDiscount(subtotal, promotionId) {
  switch (promotionId) {
    case "BIRTHDAY_20":
      return Math.min(subtotal, 20);
    case "LUNCH_12":
      return Math.min(subtotal, 12);
    case "MEMBER_10PCT":
      return Math.min(subtotal * 0.1, 30);
    default:
      return 0;
  }
}

export function calculateCheckoutTotals(subtotal, promotionId) {
  const originalAmount = clampCurrency(subtotal);
  const discountAmount = clampCurrency(calculatePromotionDiscount(originalAmount, promotionId));
  const totalAmount = clampCurrency(originalAmount - discountAmount);

  return {
    originalAmount,
    discountAmount,
    totalAmount,
  };
}

function createOrderNumber() {
  const now = Date.now().toString();
  return now.slice(-6);
}

export function createCheckoutResult({ discountAmount, lines, paymentMethodId, promotionId, totalAmount }) {
  const paymentMethod = getPaymentMethodById(paymentMethodId);
  const promotion = getPromotionById(promotionId);
  const createdAt = new Date().toISOString();
  const originalAmount = clampCurrency(
    lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
  );

  return {
    orderId: `cust-${Date.now()}`,
    orderNumber: createOrderNumber(),
    createdAt,
    paymentMethod: paymentMethod?.label ?? "",
    promotion,
    discountAmount: clampCurrency(discountAmount),
    originalAmount,
    totalAmount: clampCurrency(totalAmount),
    items: lines.map((line) => ({
      id: line.lineId,
      name: line.itemName,
      quantity: line.quantity,
      optionsLabel: [line.sizeLabel, line.sweetnessLabel, line.iceLabel]
        .concat(line.addons.length > 0 ? [line.addons.map((addon) => addon.item).join("、")] : [])
        .join(" · "),
      lineTotal: clampCurrency(line.unitPrice * line.quantity),
    })),
  };
}

export function readLatestCheckoutResult() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(CUSTOMER_CHECKOUT_RESULT_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch (error) {
    console.error("Unable to parse latest checkout result.", error);
    return null;
  }
}

export function saveLatestCheckoutResult(result) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(CUSTOMER_CHECKOUT_RESULT_STORAGE_KEY, JSON.stringify(result));
}

export { customerPaymentMethods, customerPromotionOptions };
