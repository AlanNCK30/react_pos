function DashboardBar() {
  return (
    <div className="flex justify-start gap-4 text-black w-full p-3">
      <div className="mr-auto p-3 text-3xl bg-primary text-primary-foreground rounded-xl">
        <h2>儀表板</h2>
      </div>

      <div className="bg-primary text-primary-foreground p-2 rounded-xl flex justify-center items-center text-2xl">
        <p>每日銷售額: $1000</p>
      </div>
      <div className="bg-primary text-primary-foreground p-2 rounded-xl flex justify-center items-center text-2xl">
        <p>訂單數: 100杯</p>
      </div>
      <div className="bg-primary text-primary-foreground p-2 rounded-xl flex justify-center items-center text-2xl">
        <p>平均定單銷售額: $10</p>
      </div>
    </div>
  );
}

export default DashboardBar;
