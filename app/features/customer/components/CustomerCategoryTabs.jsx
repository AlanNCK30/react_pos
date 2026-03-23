export default function CustomerCategoryTabs({
  categories,
  onCategoryChange,
  selectedCategoryId,
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        className={`rounded-lg px-3 py-2 text-md font-medium transition-colors ${
          selectedCategoryId === "all"
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
        onClick={() => onCategoryChange("all")}
        type="button"
      >
        全部
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-lg px-3 py-2 text-base font-medium transition-colors ${
            selectedCategoryId === category.id
              ? "bg-slate-950 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
          onClick={() => onCategoryChange(category.id)}
          type="button"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
