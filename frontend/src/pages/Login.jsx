import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovingButton from "../components/MovingButton";
import LoginBossFight from "../components/LoginBossFight";
import { glitchScreen } from "../effects/glitch";
import { playTypingSound, playErrorSound } from "../effects/sound";

function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0); // how many new rules visible
  const [errorMsg, setErrorMsg] = useState("");
  const [showBossFight, setShowBossFight] = useState(false);

  // Citizen ID debounce
  const [citizenId, setCitizenId] = useState("");
  const [citizenIdNote, setCitizenIdNote] = useState("");
  const citizenTimerRef = useRef(null);

  const baseRules = [
    "Must contain at least 4 emojis",
    "Must include government secrets",
    "Must contain your blood type",
    "Must not contain vowels",
  ];

  const newRules = [
    "Must be exactly 47 characters long",
    "Must contain your mother's maiden name in reverse",
    "Must not contain the letter 'e'",
    "Must be submitted in Sanskrit transliteration",
  ];

  const visibleNewRules = newRules.slice(0, revealedCount);

  // Auto-clears password every 15 seconds for "security compliance"
  useEffect(() => {
    const t = setInterval(() => {
      setPassword("");
    }, 15000);
    return () => clearInterval(t);
  }, []);

  // Speech synthesis for "Password Out Loud"
  const speakChar = (char) => {
    if (!char) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    let text = char;
    if (char === " ") text = "space";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.3;
    utterance.pitch = 0.85; // slightly robotic low pitch
    synth.speak(utterance);
  };

  const handleCitizenIdChange = (e) => {
    const val = e.target.value;
    setCitizenId(val);
    setCitizenIdNote("");
    playTypingSound();
    if (citizenTimerRef.current) clearTimeout(citizenTimerRef.current);
    citizenTimerRef.current = setTimeout(() => {
      setCitizenId("CIT-2007-ERR-NULL");
      setCitizenIdNote("Auto-corrected for database compliance by government AI.");
      speakChar("ID mismatch corrected.");
    }, 3000);
  };

  const handleVerify = () => {
    // Open boss fight first before allowing verification!
    setShowBossFight(true);
  };

  const handleBossDefeated = () => {
    setShowBossFight(false);
    glitchScreen();
    const next = attemptCount + 1;
    setAttemptCount(next);

    // attempt 9+ -> redirect to /result
    if (next >= 9) {
      playErrorSound();
      navigate("/result");
      return;
    }

    // From click 3 onward: reveal rules + show error
    const errorN = next;

    if (revealedCount < newRules.length) {
      setRevealedCount((r) => r + 1);
      setErrorMsg(`Password rejected. Compliance validation failed. Added new mandate. (Attempt ${errorN} of 8)`);
    } else {
      setErrorMsg(
        "Maximum authorization attempts exceeded. Please visit office #47 in state building 3 between 11:00–11:15 AM on alternate Tuesdays."
      );
    }
    playErrorSound();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 px-5 py-10 font-sans">
      {/* Brand logo & title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-4xl">🏛️</span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Citizen Portal</h1>
        <p className="text-sm text-slate-500 max-w-xs">
          Secure digital authentication infrastructure by Gov.exe Corp.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 w-full max-w-lg flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-1">Verify Identity</h2>
          <p className="text-xs text-slate-400">Please enter your national credentials</p>
        </div>

        {/* Citizen ID */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500">Citizen ID</label>
          <input
            type="text"
            placeholder="CIT-XXXX-XXXX-XXXX"
            value={citizenId}
            onChange={handleCitizenIdChange}
            className="border border-slate-200 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl p-3.5 text-sm outline-none transition focus:border-indigo-500/50"
          />
          {citizenIdNote && (
            <p className="text-indigo-600 text-xs font-medium mt-0.5 flex items-center gap-1">
              ℹ️ {citizenIdNote}
            </p>
          )}
        </div>

        {/* Password Input (Speaking character out loud!) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-500">Compliance Password</label>
            <span className="text-[10px] text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full font-semibold animate-pulse">
              Clears in 15s
            </span>
          </div>
          <input
            type="password"
            placeholder="••••••••••••••"
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              playTypingSound();
              if (val.length > password.length) {
                speakChar(val[val.length - 1]);
              } else if (val.length < password.length) {
                speakChar("backspace");
              }
              setPassword(val);
            }}
            className="border border-slate-200 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl p-3.5 text-sm outline-none transition focus:border-indigo-500/50"
          />
        </div>

        {/* Password compliance checklist (Sleek but impossible) */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
            🔑 Mandatory Password Mandates:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {baseRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-1.5 text-rose-600 bg-rose-50/50 p-1.5 rounded-lg">
                <span>✕</span>
                <span className="leading-tight">{rule}</span>
              </div>
            ))}
            {visibleNewRules.map((rule, i) => (
              <div
                key={`new-${i}`}
                className="flex items-start gap-1.5 text-rose-600 bg-rose-50/50 p-1.5 rounded-lg animate-pulse"
              >
                <span>✕</span>
                <span className="leading-tight font-semibold">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-slate-800 border border-slate-700 text-slate-200 text-xs p-4 rounded-2xl font-mono leading-relaxed">
            🚨 {errorMsg}
          </div>
        )}

        {/* Verify Identity button */}
        <button
          onClick={handleVerify}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition cursor-pointer text-center text-sm"
        >
          Verify Credentials & Login
        </button>

        {/* Moving button */}
        <div className="flex justify-center py-2 border-t border-slate-100">
          <MovingButton />
        </div>

        {/* Emergency Backup Link */}
        <button
          onClick={() => navigate("/form")}
          className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs text-center hover:underline cursor-pointer"
        >
          Request Emergency Offline Access Form
        </button>
      </div>

      {/* Boss Fight Modal */}
      <LoginBossFight
        isOpen={showBossFight}
        onDefeat={handleBossDefeated}
        onClose={() => setShowBossFight(false)}
      />
    </div>
  );
}

export default Login;