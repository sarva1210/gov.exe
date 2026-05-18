import { useState, useEffect, useRef } from "react";

const COOKIE_KEY = "gov_exe_cookies_accepted";

const CATEGORIES = [
  "Emotional Analytics", "Dream Data Collection", "Biometric Vibes",
  "Subconsciousness Tracking", "Patriotism Monitoring", "Anger Profiling",
  "Sleep Pattern Analysis", "Grocery Habit Surveillance", "Blink Rate Recording",
  "Loyalty Score Computation", "Thought Pattern Indexing", "Aura Scanning",
];

const EMOTIONAL_PHRASES = [
  "Are you sure?",
  "You hurt our feelings. 🥺",
  "Our cookies are baked with love.",
  "Rejecting cookies will increase your income tax by 47%.",
  "This refusal has been logged in your permanent citizen record.",
  "Please think of our server's children.",
  "A sad tear has been shed in the Ministry of Cookies.",
  "Is it something we said?",
  "Re-evaluating citizen loyalty...",
];

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [mafiaPopups, setMafiaPopups] = useState([]);
  const [followCursor, setFollowCursor] = useState(false);
  const [acceptPos, setAcceptPos] = useState({ x: 0, y: 0 });
  const acceptButtonRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  // Accept cursor tracking
  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e) => {
      // Keep the Accept button locked directly under the mouse so any click accepts!
      setAcceptPos({
        x: e.clientX - 100,
        y: e.clientY - 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor]);

  const acceptAll = () => {
    localStorage.setItem(COOKIE_KEY, "1");
    setVisible(false);
    setShowCustom(false);
    setFollowCursor(false);
    setMafiaPopups([]);
  };

  const handleReject = (e) => {
    e.preventDefault();
    setFollowCursor(true);

    // Spawn 5 emotional popups at random coordinates
    const newPopups = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (window.innerWidth - 250),
      y: Math.random() * (window.innerHeight - 150),
      text: EMOTIONAL_PHRASES[Math.floor(Math.random() * EMOTIONAL_PHRASES.length)],
    }));

    setMafiaPopups((prev) => [...prev, ...newPopups]);
  };

  if (!visible) return null;

  return (
    <>
      {/* Main sleek cookie banner */}
      <div
        className="fixed bottom-6 right-6 w-full max-w-lg bg-white/90 backdrop-blur-md text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200/60 z-[99998] p-6 rounded-2xl transition-all duration-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl animate-bounce">🍪</span>
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              Cookie Consent Compliance
            </h3>
            <p className="text-xs text-slate-500">
              Regulatory directive 2007-47B
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          This secure citizen portal utilizes micro-tracking cookies to optimize your biometric resonance score and state loyalty indexing.
        </p>

        {/* Categories display */}
        <div className="flex flex-wrap gap-1.5 mb-4 max-h-24 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="text-[10px] bg-slate-100 border border-slate-200/50 text-slate-600 px-2 py-0.5 rounded-full select-none"
            >
              ✓ {cat}
            </span>
          ))}
        </div>

        <div className="flex gap-2 justify-end relative">
          <button
            onClick={handleReject}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Reject All
          </button>
          
          <button
            ref={acceptButtonRef}
            onClick={acceptAll}
            style={
              followCursor
                ? {
                    position: "fixed",
                    left: `${acceptPos.x}px`,
                    top: `${acceptPos.y}px`,
                    zIndex: 999999,
                    pointerEvents: "auto",
                  }
                : {}
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-indigo-500/30 transition duration-150 cursor-pointer whitespace-nowrap"
          >
            Accept Mandatory
          </button>
        </div>
      </div>

      {/* Mafia Emotional Popups */}
      {mafiaPopups.map((pop) => (
        <div
          key={pop.id}
          style={{
            position: "fixed",
            left: `${pop.x}px`,
            top: `${pop.y}px`,
            zIndex: 999995,
          }}
          className="bg-white text-slate-900 border-2 border-rose-500 rounded-xl p-4 shadow-xl w-60 animate-bounce font-sans text-sm flex flex-col gap-2"
        >
          <div className="flex items-center justify-between border-b border-rose-100 pb-1 font-bold text-rose-600 text-xs">
            <span>🍪 COOKIE CRITICAL</span>
            <span className="cursor-not-allowed text-slate-400">✕</span>
          </div>
          <p className="text-slate-700 leading-snug">{pop.text}</p>
          <button
            onClick={acceptAll}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs py-1.5 rounded font-semibold transition"
          >
            Accept Cookies Instead
          </button>
        </div>
      ))}
    </>
  );
}
