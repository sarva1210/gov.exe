import { useState } from "react";
import { playCashRegister, playErrorSound } from "../effects/sound";

const PRODUCTS = [
  { id: 1, name: "Citizen Lamination Shield (Heavy Duty)", price: 470, desc: "Mandatory protective sleeve for official credentials.", icon: "🛡️" },
  { id: 2, name: "Official Stamp Ink Refill (Red)", price: 270, desc: "Special dry-resistant ink approved for government stamps.", icon: "🔴" },
  { id: 3, name: "Triplicate Carbon Copy Paper Set", price: 147, desc: "High sensitivity carbon paper for simultaneous form filing.", icon: "📄" },
];

export default function MinistryMerch() {
  const [cartCount, setCartCount] = useState(0);
  const [thiefActive, setThiefActive] = useState(false);
  const [feedback, setFeedback] = useState("");

  const addToCart = (productName) => {
    if (thiefActive) return; // Prevent double trigger

    setCartCount((c) => c + 1);
    setFeedback(`Successfully added ${productName} to secure cart.`);
    playCashRegister();

    // Trigger Cart Thief after a short, realistic 0.8s pause!
    setTimeout(() => {
      setThiefActive(true);
      playErrorSound();
      
      // Animate cart depletion
      setTimeout(() => {
        setCartCount(0);
        setThiefActive(false);
        setFeedback("⚠️ Cart Empty. Warning: 1 item stolen by the Cart Thief (Minion-47).");
      }, 1500); // Duration of the thief run
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 font-sans relative overflow-hidden bg-white p-6 rounded-3xl text-slate-800">
      {/* Thief Overlay Animation */}
      {thiefActive && (
        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-[20%] left-[-100px] text-5xl flex items-center gap-1 text-slate-800 animate-[thiefRun_1.5s_ease-in-out_forwards] font-mono">
            🏃‍♂️💨 <span className="text-xl bg-indigo-600 text-white rounded-full px-2 py-0.5 shadow-md">🛍️</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Ministry of Merchandise</h3>
          <p className="text-xs text-slate-500">Official citizen asset marketplace</p>
        </div>
        <div className="relative bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl flex items-center gap-2">
          <span className="text-lg">🛒</span>
          <span className="text-xs font-bold text-slate-700">Cart: {cartCount} items</span>
          {thiefActive && (
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
          )}
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`p-3.5 rounded-2xl text-xs font-medium border leading-relaxed ${
          feedback.includes("stolen")
            ? "bg-rose-50 border-rose-100 text-rose-600 animate-shake"
            : "bg-slate-50 border-slate-100 text-slate-600"
        }`}>
          {feedback}
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center gap-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 hover:border-slate-100 p-4 rounded-2xl transition"
          >
            <span className="text-3xl p-2.5 bg-white border border-slate-100 shadow-sm rounded-xl">{prod.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 truncate">{prod.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{prod.desc}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-sm font-bold text-slate-900">₹{prod.price}</span>
              <button
                onClick={() => addToCart(prod.name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold py-1.5 px-3 rounded-lg shadow-sm active:scale-[0.98] transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Styled Thief Animation in CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes thiefRun {
          0% { left: -100px; opacity: 1; transform: scaleX(1); }
          47% { left: 80%; opacity: 1; transform: scaleX(1); }
          53% { left: 80%; opacity: 1; transform: scaleX(-1); }
          100% { left: -100px; opacity: 1; transform: scaleX(-1); }
        }
      `}} />
    </div>
  );
}
