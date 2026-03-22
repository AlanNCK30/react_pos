import React, { useState, useEffect } from "react";
import { membersData } from "@/data/members";

const MembershipPage = () => {
  const [selectedMember, setSelectedMember] = useState(membersData[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = membersData.filter(
    (m) =>
      m.phone.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, "")) ||
      m.name.includes(searchTerm),
  );

  useEffect(() => {
    if (filteredMembers.length === 1) {
      setSelectedMember(filteredMembers[0]);
    }
  }, [searchTerm]);

  const getCardStyle = (tier) => {
    switch (tier) {
      case "GOLD":
        return "from-amber-400 to-amber-600 shadow-amber-200";
      case "SILVER":
        return "from-slate-300 to-slate-500 shadow-slate-200";
      default:
        return "from-emerald-400 to-emerald-600 shadow-emerald-200";
    }
  };

  return (
    <div>
      <div className="text-3xl text-black p-3">
        <h2>會員名錄</h2>
      </div>
      <div className="flex h-screen bg-slate-50 p-6 gap-6">
        <div className="w-[40%] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 relative">
            <h2 className="text-2xl font-black text-slate-800 mb-4">會員搜尋</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋電話或姓名..."
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-10 top-19 w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-xs hover:bg-slate-300 transition-colors">
                ✕
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xl uppercase font-black text-slate-400">
                <tr>
                  <th className="p-4">會員姓名</th>
                  <th className="p-4 text-right">積分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className={`cursor-pointer transition-colors ${selectedMember?.id === m.id ? "bg-emerald-50" : "hover:bg-slate-50"}`}>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{m.name}</p>
                        <p className="text-[14px] text-slate-400">{m.phone}</p>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-black text-emerald-600">{m.points}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-10 text-center text-slate-300 italic text-sm">
                      找不到相符的會員資料
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
          {selectedMember ? (
            <>
              <div
                className={`w-full aspect-[1.6/1] rounded-4xl p-8 text-white flex flex-col justify-between bg-linear-to-br shadow-2xl relative overflow-hidden transition-all duration-500 ${getCardStyle(selectedMember.tier)}`}>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">
                      Membership Card
                    </p>
                    <h3 className="text-2xl font-black mt-1 uppercase">
                      {selectedMember.tier} TIER
                    </h3>
                  </div>
                  <div className="text-3xl">🥤</div>
                </div>

                <div>
                  <p className="text-sm font-medium opacity-80">Card Holder</p>
                  <h4 className="text-3xl font-black tracking-tighter">{selectedMember.name}</h4>
                  <div className="mt-4 flex justify-between items-end">
                    <p className="font-mono text-lg opacity-90">{selectedMember.phone}</p>
                    <p className="text-[10px] font-bold opacity-60">
                      SINCE {selectedMember.joinDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase">現有積分</p>
                  <p className="text-3xl font-black text-slate-800 mt-1">
                    {selectedMember.points} <span className="text-sm text-slate-400">PTS</span>
                  </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase">累積消費額</p>
                  <p className="text-3xl font-black text-slate-800 mt-1">$4,250</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <p className="p-6 font-black text-slate-800 border-b border-slate-50">
                  最近消費紀錄
                </p>
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {selectedMember.history.map((h) => (
                      <tr key={h.id} className="text-sm">
                        <td className="p-4 text-slate-400 font-medium">{h.date}</td>
                        <td className="p-4 font-bold text-slate-700">{h.item}</td>
                        <td className="p-4 text-right font-black text-emerald-600">${h.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 italic">
              請從左側選擇會員以查看詳情
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
