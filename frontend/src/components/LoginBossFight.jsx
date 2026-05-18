import { useState, useEffect } from "react";
import { playErrorSound, playCashRegister } from "../effects/sound";

export default function LoginBossFight({ isOpen, onDefeat, onClose }) {
  const [bossHp, setBossHp] = useState(500);
  const [playerSanity, setPlayerSanity] = useState(100);
  const [combatLog, setCombatLog] = useState(["The Auditor General challenges your citizen status."]);
  const [shieldActive, setShieldActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isVictor, setIsVictor] = useState(false);

  const maxBossHp = 500;
  const maxPlayerSanity = 100;

  // Boss attack ticker
  useEffect(() => {
    if (!isOpen || gameEnded) return;

    const interval = setInterval(() => {
      // Boss attacks randomly
      const attacks = [
        { name: "Unscheduled Audit", damage: 15, text: "The Auditor General launches an Unscheduled Audit! -15 Sanity" },
        { name: "Late Surcharge Fee", damage: 10, text: "The Auditor General charges a 47% Late Fee! -10 Sanity" },
        { name: "Form 27-B Discontinuation", damage: 25, text: "Form 27-B is discontinued! Panic ensued. -25 Sanity" },
        { name: "Subcaste Verification Query", damage: 12, text: "biometric mismatch queried! -12 Sanity" },
      ];

      const attack = attacks[Math.floor(Math.random() * attacks.length)];
      
      setPlayerSanity((prev) => {
        let finalDamage = attack.damage;
        if (shieldActive) {
          finalDamage = Math.floor(attack.damage / 3);
          setShieldActive(false);
          setCombatLog((log) => [`🛡️ Your appeal deflected most of the ${attack.name}!`, ...log.slice(0, 5)]);
        }
        
        const nextSanity = prev - finalDamage;
        if (nextSanity <= 0) {
          setGameEnded(true);
          setIsVictor(false);
          playErrorSound();
          return 0;
        }
        return nextSanity;
      });

      if (!shieldActive) {
        setCombatLog((log) => [attack.text, ...log.slice(0, 5)]);
        playErrorSound();
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen, gameEnded, shieldActive]);

  const addLog = (msg) => {
    setCombatLog((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const handleAction = (actionType) => {
    if (gameEnded) return;

    if (actionType === "triplicate") {
      // File forms in triplicate - slow but massive damage
      const dmg = 80;
      setBossHp((prev) => {
        const next = prev - dmg;
        if (next <= 0) {
          setGameEnded(true);
          setIsVictor(true);
          return 0;
        }
        return next;
      });
      addLog(`📄 Filed Form in Triplicate! Dealt ${dmg} compliance damage to Auditor.`);
      playCashRegister();
    } else if (actionType === "evade") {
      // Tax evasion - risk of double attack or high damage
      const rand = Math.random();
      if (rand > 0.4) {
        const dmg = 120;
        setBossHp((prev) => {
          const next = prev - dmg;
          if (next <= 0) {
            setGameEnded(true);
            setIsVictor(true);
            return 0;
          }
          return next;
        });
        addLog(`💰 Successfully evaded taxes! Auditor General took ${dmg} psychological damage.`);
        playCashRegister();
      } else {
        // Backfired!
        setPlayerSanity((prev) => {
          const next = prev - 30;
          if (next <= 0) {
            setGameEnded(true);
            setIsVictor(false);
            return 0;
          }
          return next;
        });
        addLog("🚨 Tax evasion attempt failed! Government AI issued an immediate penalty. -30 Sanity.");
        playErrorSound();
      }
    } else if (actionType === "appeal") {
      // Active shield for next attack
      setShieldActive(true);
      addLog("🛡️ Filed official appeal. Prepared to deflect the next audit.");
    } else if (actionType === "bribe") {
      // Bribe - Boss heals or gets angry
      const rand = Math.random();
      if (rand > 0.5) {
        // Boss takes damage from your capital
        setBossHp((prev) => Math.max(prev - 40, 0));
        addLog("💵 Bribed Clerk. The Clerk subtly shredded Auditor's dossier. -40 Boss HP.");
      } else {
        // Boss is offended!
        setBossHp((prev) => Math.min(prev + 50, maxBossHp));
        addLog("😠 Auditor General is incorruptible today! Integrity is boosted! Boss heals +50 HP.");
      }
    }
  };

  const resetGame = () => {
    setBossHp(maxBossHp);
    setPlayerSanity(maxPlayerSanity);
    setCombatLog(["The Auditor General challenges your credentials."]);
    setShieldActive(false);
    setGameEnded(false);
    setIsVictor(false);
  };

  const handleContinue = () => {
    if (isVictor) {
      onDefeat();
    } else {
      resetGame();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[99999] flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[94vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Authorization Challenge</h2>
            <p className="text-xs text-slate-500">Security Clearance Level 47 Required</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-2 hover:bg-slate-100 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Fight Screen */}
        <div className="p-8 flex flex-col gap-6 flex-1">
          {/* Boss Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                👨‍💼 <span className="text-rose-600 font-bold">THE AUDITOR GENERAL</span>
              </span>
              <span>{bossHp} / {maxBossHp} HP</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-rose-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
              />
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex justify-center my-1 relative">
            <span className="bg-white px-4 py-1 border border-slate-200 text-xs font-bold text-slate-400 rounded-full z-10">VS</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100"></div>
          </div>

          {/* Player Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                😐 <span>CITIZEN COMPLIANCE SANITY</span>
              </span>
              <span>{playerSanity} / {maxPlayerSanity} SP</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(playerSanity / maxPlayerSanity) * 100}%` }}
              />
            </div>
          </div>

          {/* Combat Log */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 h-36 overflow-y-auto font-mono text-xs flex flex-col gap-1 text-slate-600">
            {combatLog.map((log, idx) => (
              <p key={idx} className={idx === 0 ? "text-indigo-600 font-bold" : ""}>
                {log}
              </p>
            ))}
          </div>

          {/* Action Pad */}
          {!gameEnded ? (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => handleAction("triplicate")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-2xl font-semibold shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] transition cursor-pointer text-sm"
              >
                📄 File Triplicate Forms
              </button>
              <button
                onClick={() => handleAction("evade")}
                className="bg-slate-800 hover:bg-slate-900 text-white py-3.5 px-4 rounded-2xl font-semibold shadow-md active:scale-[0.98] transition cursor-pointer text-sm"
              >
                💸 Attempt Tax Evasion
              </button>
              <button
                onClick={() => handleAction("appeal")}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 px-4 rounded-2xl font-semibold active:scale-[0.98] transition cursor-pointer text-sm"
              >
                🛡️ File Formal Appeal
              </button>
              <button
                onClick={() => handleAction("bribe")}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 px-4 rounded-2xl font-semibold active:scale-[0.98] transition cursor-pointer text-sm"
              >
                💵 Bribe Low-Level Clerk
              </button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center flex flex-col items-center gap-4 animate-fade-in">
              <span className="text-5xl">{isVictor ? "🏆" : "☠️"}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {isVictor ? "Challenge Defeated!" : "Audit Failed!"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {isVictor
                    ? "The Auditor General reluctantly signs your authorization documents."
                    : "Your psychological sanity has been fully audited. All credentials rejected."}
                </p>
              </div>
              <button
                onClick={handleContinue}
                className={`py-3 px-8 rounded-2xl font-bold transition shadow-lg w-full max-w-xs cursor-pointer ${
                  isVictor
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                    : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
                }`}
              >
                {isVictor ? "Proceed to Portal" : "Retry Authorization Fight"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
