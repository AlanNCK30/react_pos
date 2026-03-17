function DashboardBar() {
  return (
    <div className="flex justify-start gap-4 text-2xl text-black w-full p-4">
      <div className="p-2 mr-auto text-3xl">
        <h2>Dashboard</h2>
      </div>

      <div className="bg-slate-200 p-2 rounded-2xl">
        <p>Daily Sales $1000</p>
      </div>
      <div className="bg-slate-200 p-2 rounded-2xl">
        <p>Total Order 100</p>
      </div>
      <div className="bg-slate-200 p-2 rounded-2xl">
        <p>Avg Order Value $10</p>
      </div>
    </div>
  );
}

export default DashboardBar;
