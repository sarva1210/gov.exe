import { useState } from "react";

const CAPTCHA_DATA = [
  {
    topic: "images containing 'Genuine Bureaucratic Sadness'",
    items: [
      { id: 1, label: "📋 Stamped Form 27-B", active: false },
      { id: 2, label: "😢 Crying in Office #4", active: false },
      { id: 3, label: "📠 Broken Fax (2019)", active: false },
      { id: 4, label: "☕ Cold Tea on Desk", active: false },
      { id: 5, label: "🌞 Sunny Day Outside", active: false },
      { id: 6, label: "🎉 Office Party (Cancelled)", active: false },
      { id: 7, label: "🗄️ Locked Filing Drawer", active: false },
      { id: 8, label: "💰 Tax Bill (Unpaid)", active: false },
      { id: 9, label: "🏖️ Citizen on Vacation", active: false },
    ]
  },
  {
    topic: "images containing 'Damp Rubber Stamps'",
    items: [
      { id: 1, label: "🔴 Red Stamp (Damp)", active: false },
      { id: 2, label: "🔵 Blue Stamp (Dry)", active: false },
      { id: 3, label: "🍎 Red Apple", active: false },
      { id: 4, label: "🖋️ Ink Well (Empty)", active: false },
      { id: 5, label: "📄 Watermarked Page", active: false },
      { id: 6, label: "🏢 Government Building", active: false },
      { id: 7, label: "🧽 Stamp Pad", active: false },
      { id: 8, label: "💧 Raindrop on Paper", active: false },
      { id: 9, label: "🍞 Dry Toast", active: false },
    ]
  },
  {
    topic: "images showing 'Silent Dissatisfaction'",
    items: [
      { id: 1, label: "🤐 Staring at Printer", active: false },
      { id: 2, label: "😀 Cheerful Smile", active: false },
      { id: 3, label: "🥱 Yawning Clerk", active: false },
      { id: 4, label: "🤨 Eyebrow Raised", active: false },
      { id: 5, label: "🪑 Empty Waiting Chair", active: false },
      { id: 6, label: "🍩 Free Donut", active: false },
      { id: 7, label: "🕒 Clock stuck at 4:59 PM", active: false },
      { id: 8, label: "🗑️ Rejected Appeal Document", active: false },
      { id: 9, label: "🐶 Happy Puppy", active: false },
    ]
  }
];

export default function NeverEndingCaptcha({ onComplete }) {
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const currentData = CAPTCHA_DATA[level % CAPTCHA_DATA.length];

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleVerify = () => {
    if (selectedIds.length === 0) {
      setErrorMsg("Please select at least one matching image.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setLoading(false);
      setSelectedIds([]);
      setLevel((prev) => prev + 1);
      
      // Let it go forever but display progress
      setErrorMsg(`Step ${level + 1} approved! Please complete verification step ${level + 2}.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 font-sans max-w-sm mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-slate-800">
      <div>
        <h3 className="text-md font-bold text-slate-900 leading-tight">Human Verification</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select all squares showing: <strong className="text-indigo-600 font-semibold">{currentData.topic}</strong>
        </p>
      </div>

      {/* Grid of options */}
      <div className="grid grid-cols-3 gap-2">
        {currentData.items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`aspect-square p-2 border rounded-xl text-center flex flex-col items-center justify-center text-xs transition cursor-pointer select-none ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/50 text-indigo-700 font-semibold shadow-sm shadow-indigo-100"
                  : "border-slate-100 hover:bg-slate-50 text-slate-600"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {errorMsg && (
        <p className="text-xs text-indigo-600 font-medium leading-relaxed">
          ℹ️ {errorMsg}
        </p>
      )}

      <div className="flex justify-between items-center border-t border-slate-100 pt-3">
        <span className="text-[10px] text-slate-400 font-mono">Captcha ID: CIT-{(level + 47) * 7}</span>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-5 rounded-xl transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Identity"}
        </button>
      </div>
    </div>
  );
}
