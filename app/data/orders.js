const CASHIER_NAMES = ['何榮基', '陳家樂', '黃佩琪', '李芷晴', '張文軒', '周雅婷'];

const PAYMENT_METHODS = ['八達通', '現金', '信用卡', '微信支付', '支付寶', 'PayMe'];

const ORDER_ITEM_LIBRARY = [
  [
    { name: '基哥招牌奶茶', price: 39.9, quantity: 1 },
    { name: '珍珠鮮奶茶', price: 42, quantity: 1 },
    { name: '脆波波綠茶', price: 26, quantity: 2 },
  ],
  [
    { name: '黑糖珍珠鮮奶', price: 38, quantity: 2 },
    { name: '伯爵奶蓋紅茶', price: 42, quantity: 1 },
  ],
  [
    { name: '芒果果茶', price: 39, quantity: 1 },
    { name: '芝士奶蓋烏龍', price: 47, quantity: 1 },
    { name: '凍頂烏龍茶', price: 24, quantity: 2 },
  ],
  [
    { name: '阿薩姆奶茶', price: 36, quantity: 2 },
    { name: '仙草凍鮮奶', price: 41, quantity: 1 },
    { name: '檸檬紅茶', price: 28, quantity: 1 },
  ],
  [
    { name: '茉莉綠茶', price: 24, quantity: 2 },
    { name: '布丁奶茶', price: 40, quantity: 1 },
    { name: '珍珠烏龍鮮奶', price: 44, quantity: 1 },
  ],
  [
    { name: '紅豆鮮奶綠', price: 40, quantity: 1 },
    { name: '多多綠茶', price: 30, quantity: 2 },
    { name: '柚子蜂蜜茶', price: 37, quantity: 1 },
  ],
  [
    { name: '金桔檸檬', price: 31, quantity: 2 },
    { name: '四季春青茶', price: 25, quantity: 2 },
    { name: '奶蓋四季春', price: 41, quantity: 1 },
  ],
  [
    { name: '宇治抹茶鮮奶', price: 46, quantity: 1 },
    { name: '黑糖波霸奶茶', price: 39, quantity: 2 },
    { name: '冬瓜檸檬', price: 29, quantity: 1 },
  ],
];

const PROMOTION_LIBRARY = [
  null,
  {
    title: '會員生日優惠',
    description: '生日月會員訂單折抵 HK$20.00。',
    amount: 20,
  },
  null,
  {
    title: '午市快閃優惠',
    description: '12:00 至 14:00 下單折抵 HK$12.00。',
    amount: 12,
  },
  {
    title: '飲品組合優惠',
    description: '指定飲品組合折抵 HK$15.00。',
    amount: 15,
  },
  null,
  {
    title: '週末限時折扣',
    description: '全單限時折抵 HK$10.00。',
    amount: 10,
  },
  null,
];

function createOrderItems(orderId, itemTemplate, cycle) {
  return itemTemplate.map((item, index) => {
    const extraQuantity = (cycle + index) % 4 === 0 ? 1 : 0;
    const quantity = item.quantity + extraQuantity;

    return {
      id: `${orderId}-item-${index + 1}`,
      name: item.name,
      quantity,
      lineTotal: Number((item.price * quantity).toFixed(1)),
    };
  });
}

function createPromotions(orderId, promotionTemplate) {
  if (!promotionTemplate) {
    return [];
  }

  return [
    {
      id: `${orderId}-promo-1`,
      ...promotionTemplate,
    },
  ];
}

export const ORDER_HISTORY_MOCK_ORDERS = Array.from({ length: 24 }, (_, index) => {
  const day = 24 - Math.floor(index / 4);
  const slot = index % 4;
  const hourPattern = [20, 18, 15, 12];
  const minutePattern = [45, 28, 17, 6];
  const createdAt = new Date(
    Date.UTC(2026, 2, day, hourPattern[slot], minutePattern[(index + slot) % minutePattern.length], 0)
  ).toISOString();
  const orderId = `ord-${createdAt.slice(0, 10).replace(/-/g, '')}-${String(index + 1).padStart(3, '0')}`;
  const items = createOrderItems(orderId, ORDER_ITEM_LIBRARY[index % ORDER_ITEM_LIBRARY.length], index);
  const promotions = createPromotions(orderId, PROMOTION_LIBRARY[index % PROMOTION_LIBRARY.length]);
  const originalAmount = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(1));
  const discountAmount = Number(
    promotions.reduce((sum, promotion) => sum + promotion.amount, 0).toFixed(1)
  );

  return {
    id: orderId,
    orderNumber: String(14380 - index),
    createdAt,
    cashierName: CASHIER_NAMES[index % CASHIER_NAMES.length],
    paymentMethod: PAYMENT_METHODS[index % PAYMENT_METHODS.length],
    status: index % 7 === 2 ? '已退款' : '已完成',
    originalAmount,
    discountAmount,
    totalAmount: Number(Math.max(originalAmount - discountAmount, 0).toFixed(1)),
    promotions,
    items,
  };
});
