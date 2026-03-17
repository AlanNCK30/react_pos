function CardLayout({ children, className, title }) {
  return (
    <div
      className={`flex flex-col text-center text-2xl text-black shadow-sm rounded-2xl bg-slate-300 overflow-hidden ${className}`}>
      <h3 className="bg-slate-400">{title}</h3>
      {children}
    </div>
  );
}
export default CardLayout;
