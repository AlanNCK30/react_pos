import React from "react";

function PosBar() {
  return (
    <div className="flex justify-start gap-4 text-2xl text-black w-full p-4">
      <div className="p-2 mr-auto text-3xl">
        <h2>POS</h2>
      </div>

      <div className="bg-chart-1 px-4 py-2 rounded-xl">
        <p>每日銷售額: $1000</p>
      </div>
      <div className="bg-chart-1 px-4 py-2 rounded-xl">
        <p>定單數: 100杯</p>
      </div>
      <div className="bg-chart-1 px-4 py-2 rounded-xl">
        <p>平均定單銷售額: $10</p>
      </div>
    </div>
  );
}

export default PosBar;
