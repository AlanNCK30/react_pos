function Promotion() {
  const promos = [
    {
      name: "珍珠奶茶",
      discount: "八折",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    {
      name: "水果茶",
      discount: "七折",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
    {
      name: "咖啡",
      discount: "五折",
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    {
      name: "品茗",
      discount: "八折",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
    },
  ];

  return (
    <div className="h-full flex flex-col justify-center p-4 gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-black bg-orange-500 text-white px-2 py-0.5 rounded">
          熱門
        </span>
      </div>

      <div className="space-y-3">
        {promos.map((p) => (
          <div
            key={p.name}
            className={`flex justify-between items-center px-4 py-3 rounded-xl border-2 shadow-sm transition-transform hover:scale-[1.02] ${p.bg} ${p.border}`}
          >
            <span className={`font-black text-lg ${p.text}`}>{p.name}</span>
            <span
              className={`px-3 py-1 rounded-lg font-black text-sm bg-white border ${p.border} ${p.text} shadow-sm`}
            >
              {p.discount}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-base text-gray-400 text-center italic">
        * 確認客戶是否有會員卡再套用折扣
      </p>
    </div>
  );
}

export default Promotion;
