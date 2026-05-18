import { useState, useEffect, useCallback } from "react";
import Taskbar from "../components/Taskbar";
import DesktopIcon from "../components/DesktopIcon";
import Window from "../components/Window";
import VirusPopup from "../components/VirusPopup";
import FakeAds from "../components/FakeAds";
import BSOD from "../components/BSOD";
import Notification from "../components/Notification";
import Scene from "../three/Scene";
import useChaosStore from "../store/useChaosStore";
import PopupSpawner from "../components/PopupSpawner";
import CookieBanner from "../components/CookieBanner";
import CursorChaser from "../components/CursorChaser";
import { glitchScreen } from "../effects/glitch";
import { playWindowSound, playCashRegister, playStartupJingle, playErrorSound } from "../effects/sound";
import VirusCatastrophe from "../components/VirusCatastrophe";
import RickrollPDFViewer from "../components/RickrollPDFViewer";
import MinistryMerch from "../components/MinistryMerch";
import NeverEndingCaptcha from "../components/NeverEndingCaptcha";

const TICKER_TEXT = "IMPORTANT: Portal under maintenance Jan 1 - Dec 31  |  New Aadhaar rule: must be laminated  |  Fax lines open 11:00–11:15 AM Tuesdays  |  Downloading this page is prohibited  |  Your session is being recorded for quality assurance  |  Citizens found scrolling horizontally will be fined  |  Minister of Digital Affairs congratulates you on using this portal  |  This message will self-destruct in 30 seconds (it will not)";

// Helper for window positioning
const randomPos = (existing) => {
  let top, left, attempts = 0;
  do {
    top = Math.floor(Math.random() * 35) + 5;
    left = Math.floor(Math.random() * 45) + 5;
    attempts++;
  } while (
    attempts < 20 &&
    existing.some(w => Math.abs(w.top - top) < 6 && Math.abs(w.left - left) < 8)
  );
  return { top, left };
};

// Tax.exe inner component
function TaxExe() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [loading, setLoading] = useState(false);
  const [dispute, setDispute] = useState("");
  const tax = income ? Math.ceil(Number(income) * 4.7) + 47000 : 0;

  const submitIncome = () => {
    if (!income) return;
    setLoading(true);
    playCashRegister();
    setTimeout(() => { setLoading(false); setStep(2); }, 4000);
  };

  const submitDispute = () => setStep(3);

  if (step === 1) return (
    <div className="flex flex-col gap-3 font-sans">
      <p className="font-bold text-rose-600">Annual Income Tax Filing Portal</p>
      <input
        type="number" placeholder="Enter your annual income (₹)"
        value={income} onChange={e => setIncome(e.target.value)}
        className="border border-slate-200 bg-slate-50 p-3 rounded-xl focus:bg-white transition outline-none text-sm"
      />
      {loading
        ? <p className="text-orange-600 animate-pulse text-xs">Calculating emotional tax liability...</p>
        : <button onClick={submitIncome} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm">Calculate Tax</button>
      }
    </div>
  );

  if (step === 2) return (
    <div className="flex flex-col gap-3 font-sans">
      <p className="font-bold text-slate-800">Tax Assessment Result</p>
      <p className="text-sm">Base amount: ₹{Math.ceil(Number(income) * 4.7).toLocaleString()}</p>
      <p className="text-rose-600 font-bold text-sm">Emotional Distress Surcharge (47%): ₹47,000</p>
      <p className="text-2xl font-bold border-t border-slate-100 pt-2 text-slate-900">Total: ₹{tax.toLocaleString()}</p>
      <button onClick={submitDispute} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm">Dispute Amount</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 font-sans">
      <p className="font-bold text-rose-600">File Dispute (Form 47-D)</p>
      <textarea
        placeholder="Explain why this tax assessment is unjust..."
        value={dispute} onChange={e => setDispute(e.target.value)}
        className="border border-slate-200 bg-slate-50 p-3 rounded-xl focus:bg-white transition outline-none text-sm h-28"
      />
      <button onClick={submitDispute} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm">Submit Dispute</button>
      {step === 3 && (
        <p className="text-rose-600 text-xs font-mono animate-pulse mt-1">
          Dispute rejected in 0.003 seconds. Government AI has spoken.
        </p>
      )}
    </div>
  );
}

// Ministry of Downloads inner component
function MinistryDownloads({ onDownloadCertificate }) {
  const [prog1, setProg1] = useState(0);
  const [prog2, setProg2] = useState(0);

  const startDownload = (setter, filename, content, isCertificate = false) => {
    setter(0);
    const t = setInterval(() => {
      setter(p => {
        if (p >= 98) { 
          clearInterval(t);
          if (isCertificate && onDownloadCertificate) {
            onDownloadCertificate();
          }
          return 98;
        }
        return Math.min(p + 3, 98);
      });
    }, 90);
    // Create fake file download
    setTimeout(() => {
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    }, 100);
  };

  return (
    <div className="flex flex-col gap-5 font-sans">
      <p className="font-bold text-slate-800 text-md">Official Government File Download Portal</p>

      <div>
        <button
          onClick={() => startDownload(
            setProg1,
            "citizen_certificate.pdf",
            "This document is intentionally left blank. Reference: PENDING.",
            true
          )}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 w-full rounded-xl font-semibold text-sm transition cursor-pointer"
        >
          Download Citizen Certificate (PDF)
        </button>
        {prog1 > 0 && (
          <>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-emerald-500 h-3 rounded-full transition-all duration-150" style={{ width: `${prog1}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              {prog1 < 98 ? `Downloading... ${prog1}%` : "Finalizing... (please do not close this window)"}
            </p>
          </>
        )}
      </div>

      <div>
        <button
          onClick={() => startDownload(
            setProg2,
            "form_27b_FINAL_v3_REVISED_2009_UPDATED.doc",
            "Form 27-B has been discontinued. Please fill Form 27-C. Form 27-C is available at your nearest office."
          )}
          className="border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 px-4 w-full rounded-xl font-semibold text-sm transition cursor-pointer"
        >
          Download Form 27-B
        </button>
        {prog2 > 0 && (
          <>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-indigo-500 h-3 rounded-full transition-all duration-150" style={{ width: `${prog2}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              {prog2 < 98 ? `Downloading... ${prog2}%` : "Finalizing... (please do not close this window)"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);
  const [termLine, setTermLine] = useState("ACCESSING CITIZEN DATA...");

  // Antivirus / Virus Scanner state 
  const [threats, setThreats] = useState(69);
  const [virusClicks, setVirusClicks] = useState(0);
  const [catastropheActive, setCatastropheActive] = useState(false);
  const [rickrollActive, setRickrollActive] = useState(false);

  // Right-click context menu
  const [ctxMenu, setCtxMenu] = useState(null);

  const rageLevel = useChaosStore(s => s.rageLevel);
  const incrementRage = useChaosStore(s => s.incrementRage);

  const [isShakingActive, setIsShakingActive] = useState(false);
  const isHighRage = rageLevel >= 80;

  // Custom Desktop Icon Positions for scatter layout
  const [iconPositions, setIconPositions] = useState({
    "Citizen Login": { top: 60, left: 40 },
    "Tax.exe": { top: 160, left: 40 },
    "Virus Scanner": { top: 260, left: 40 },
    "National Form": { top: 360, left: 40 },
    "Ministry of Downloads": { top: 460, left: 40 },
    "Ministry of Merch": { top: 560, left: 40 },
    "Captcha.exe": { top: 660, left: 40 },
  });

  // Tsunami State
  const [tsunamiActive, setTsunamiActive] = useState(false);

  // Periodic Tsunami Wave scheduler (Every 20 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTsunamiActive(true);
      
      // Scatter icons after the sweep completes (1.3 seconds)
      setTimeout(() => {
        setIconPositions((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((key) => {
            const marginX = 180;
            const marginY = 220;
            next[key] = {
              top: Math.floor(Math.random() * (window.innerHeight - marginY) + 60),
              left: Math.floor(Math.random() * (window.innerWidth - marginX) + 60),
            };
          });
          return next;
        });
        setTsunamiActive(false);
        playErrorSound();
      }, 1300);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Handle screen shake
  useEffect(() => {
    if (!isHighRage) {
      setIsShakingActive(false);
      return;
    }

    let activeTimeout;
    let gapTimeout;

    const triggerShake = () => {
      setIsShakingActive(true);
      const shakeDuration = 4000;
      activeTimeout = setTimeout(() => {
        setIsShakingActive(false);
        const randomGap = 30000 + Math.random() * 10000;
        gapTimeout = setTimeout(() => {
          triggerShake();
        }, randomGap);
      }, shakeDuration);
    };

    triggerShake();

    return () => {
      clearTimeout(activeTimeout);
      clearTimeout(gapTimeout);
    };
  }, [isHighRage]);

  // Periodic glitch
  useEffect(() => {
    const i = setInterval(glitchScreen, 10000);
    return () => clearInterval(i);
  }, []);

  // Terminal line rotation
  useEffect(() => {
    const lines = [
      "ACCESSING CITIZEN DATA...", "SCANNING EMOTIONAL HISTORY...",
      "UPLOADING MEMORIES TO CLOUD...", "CALCULATING TAX ON BREATHING...",
      "FLAGGING SUSPICIOUS BLINKING...", "SELLING DATA TO 47 AGENCIES...",
      "REBOOTING DEMOCRACY...", "VERIFYING LOYALTY SCORE...",
    ];
    const i = setInterval(() => {
      setTermLine(lines[Math.floor(Math.random() * lines.length)]);
    }, 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { playStartupJingle(); }, []);

  const openWindow = useCallback((title) => {
    setOpenWindows(prev => {
      if (prev.find(w => w.title === title)) return prev;
      playWindowSound();
      const { top, left } = randomPos(prev);
      return [...prev, { title, top, left }];
    });
  }, []);

  const closeWindow = (title) =>
    setOpenWindows(prev => prev.filter(w => w.title !== title));

  const isOpen = (title) => openWindows.some(w => w.title === title);
  const getPos = (title) => openWindows.find(w => w.title === title) ?? { top: 20, left: 20 };

  const handleVirusClick = () => {
    if (virusClicks >= 3) return;
    const next = virusClicks + 1;
    setVirusClicks(next);
    setThreats(t => t + Math.floor(Math.random() * 13) + 3);
    incrementRage(10);

    if (next >= 3) {
      setTimeout(() => {
        setCatastropheActive(true);
      }, 1000);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };
  const closeCtxMenu = () => setCtxMenu(null);

  // Rage style properties
  const rageStyle = (rageLevel >= 80 && isShakingActive)
    ? { animation: "shake 0.1s infinite", filter: "saturate(3)" }
    : rageLevel >= 80
      ? { filter: "saturate(3)" }
      : rageLevel >= 60
        ? { filter: "hue-rotate(20deg) saturate(2)" }
        : {};

  return (
    <div
      className="h-screen w-full overflow-hidden relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 scanlines select-none"
      style={rageStyle}
      onContextMenu={handleContextMenu}
      onClick={closeCtxMenu}
    >
      {/* Ticker Banner */}
      <div className="w-full bg-slate-900 border-b border-indigo-500/20 text-indigo-400 font-mono text-[11px] py-1.5 overflow-hidden z-50 relative tracking-wide">
        <div
          className="whitespace-nowrap"
          style={{ display: "inline-block", animation: "marquee 40s linear infinite" }}
        >
          {TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{TICKER_TEXT}
        </div>
      </div>

      <Scene />
      <BSOD />
      <FakeAds />
      <CookieBanner />
      <CursorChaser />
      <PopupSpawner />

      {/* Notifications */}
      <Notification text="Citizen resonance optimal" top={20} left={70} />
      <Notification text="Aura assessment score: 89%" top={40} left={72} />
      <Notification text="Webcam emotionally engaged" top={60} left={73} />

      {/* Rage meter */}
      <div
        className={`absolute top-12 right-6 px-5 py-3 border rounded-2xl z-50 font-sans font-semibold text-xs tracking-wide transition-all duration-500 shadow-lg backdrop-blur-md
          ${rageLevel > 70
            ? "bg-rose-500/90 text-white border-rose-400 animate-pulse scale-105"
            : rageLevel > 40
              ? "bg-slate-900/90 text-rose-400 border-rose-500/30"
              : "bg-slate-900/80 text-indigo-400 border-indigo-500/20"
          }`}
      >
        Rage Multiplier: {rageLevel}% {rageLevel > 70 && "💀"}
        {rageLevel >= 90 && (
          <p className="text-[10px] animate-bounce mt-1 text-rose-200">PORTAL INSTABILITY CRITICAL</p>
        )}
      </div>

      <VirusPopup />

      {/* Animated terminal (sleek slate style) */}
      <div className="absolute bottom-24 left-6 bg-slate-950/90 text-indigo-400 px-4 py-3 rounded-2xl border border-indigo-500/20 font-mono z-50 text-xs max-w-xs shadow-xl backdrop-blur-md">
        <span className="text-indigo-600">{">"} </span>
        {termLine}
        <span className="animate-pulse">|</span>
      </div>

      {/* Scattered Desktop Icons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Object.entries(iconPositions).map(([title, pos]) => (
          <div
            key={title}
            style={{
              position: "absolute",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              transition: "top 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), left 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            className="pointer-events-auto"
          >
            <DesktopIcon title={title} onClick={() => openWindow(title)} />
          </div>
        ))}
      </div>

      {/* Windows */}

      {isOpen("Citizen Login") && (
        <Window title="Citizen Authorization Link" pos={getPos("Citizen Login")} onClose={() => closeWindow("Citizen Login")}>
          <div className="flex flex-col gap-4 font-sans p-2">
            <input type="text" placeholder="Citizen ID" className="border border-slate-100 bg-slate-50 p-2.5 rounded-xl text-xs outline-none" />
            <input type="password" placeholder="Password" className="border border-slate-100 bg-slate-50 p-2.5 rounded-xl text-xs outline-none" />
            <button
              onClick={() => window.location.href = "/login"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-xs font-semibold cursor-pointer"
            >Launch Authorization Flow</button>
          </div>
        </Window>
      )}

      {isOpen("Virus Scanner") && (
        <Window title="Biometric Security Shield" pos={getPos("Virus Scanner")} onClose={() => closeWindow("Virus Scanner")}>
          <div className="flex flex-col gap-3 font-sans p-2">
            <p className="text-sm font-bold text-slate-800">
              {virusClicks >= 3
                ? "Security shield has been compromised. 💀"
                : `${threats} vulnerabilities identified.`}
            </p>
            {virusClicks < 3 && (
              <button onClick={handleVirusClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-xs font-semibold cursor-pointer">
                {virusClicks === 0 ? "Resolve Vulnerabilities" : "Verification Failed. Retry?"}
              </button>
            )}
          </div>
        </Window>
      )}

      {isOpen("Tax.exe") && (
        <Window title="Assessed Tax Filing Module" pos={getPos("Tax.exe")} onClose={() => closeWindow("Tax.exe")}>
          <TaxExe />
        </Window>
      )}

      {isOpen("National Form") && (
        <Window title="Citizen Registration Draft" pos={getPos("National Form")} onClose={() => closeWindow("National Form")}>
          <div className="flex flex-col gap-3 font-sans p-2">
            <input type="text" placeholder="Full Name" className="border border-slate-100 bg-slate-50 p-2.5 rounded-xl text-xs outline-none" />
            <select className="border border-slate-100 bg-slate-50 p-2.5 rounded-xl text-xs outline-none text-slate-600">
              <option>Select Status Badge</option>
              <option>Mildly Taxed</option>
              <option>Extremely Compliant</option>
              <option>Awaiting Lamination</option>
            </select>
            <button
              onClick={() => window.location.href = "/form"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-xs font-semibold cursor-pointer"
            >Launch Draft Intake Portal</button>
          </div>
        </Window>
      )}

      {isOpen("Ministry of Downloads") && (
        <Window title="National Citizen Library" pos={getPos("Ministry of Downloads")} onClose={() => closeWindow("Ministry of Downloads")}>
          <MinistryDownloads onDownloadCertificate={() => setRickrollActive(true)} />
        </Window>
      )}

      {/* Ministry of Merch shopping window */}
      {isOpen("Ministry of Merch") && (
        <Window title="Gov.exe Premium Shop" pos={getPos("Ministry of Merch")} onClose={() => closeWindow("Ministry of Merch")}>
          <MinistryMerch />
        </Window>
      )}

      {/* Captcha endless loop window */}
      {isOpen("Captcha.exe") && (
        <Window title="Human Verification Console" pos={getPos("Captcha.exe")} onClose={() => closeWindow("Captcha.exe")}>
          <NeverEndingCaptcha />
        </Window>
      )}

      {/* Right-click context menu */}
      {ctxMenu && (
        <div
          className="fixed z-[99999] bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-2xl rounded-2xl py-2 w-56 font-sans text-xs"
          style={{ top: ctxMenu.y, left: ctxMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {[
            ["Report Suspicious UI Behaviors", "Thank you. Your feedback has been submitted to the void."],
            ["Request Premium Help", "Helpdesk offline. Please file Form 27-C at nearest booth."],
            ["Secure Terminate Session", "Termination prohibited. Please complete current form updates."],
            ["Request Aadhaar Lamination", "Request logged. Lamination scheduled for Q3 2039."],
          ].map(([label, msg]) => (
            <div
              key={label}
              className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition"
              onClick={() => { alert(msg); closeCtxMenu(); }}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {catastropheActive && (
        <VirusCatastrophe
          onComplete={() => {
            setCatastropheActive(false);
            setVirusClicks(0);
            setThreats(69);
          }}
        />
      )}

      {rickrollActive && (
        <RickrollPDFViewer
          onClose={() => setRickrollActive(false)}
        />
      )}

      {/* Sleek Tsunami Wave animation canvas */}
      {tsunamiActive && (
        <div className="fixed inset-y-0 left-0 bg-gradient-to-r from-indigo-500/60 via-cyan-500/70 to-indigo-600/60 backdrop-blur-[2px] z-[999999] pointer-events-none animate-[tsunamiSweep_1.3s_ease-in-out_forwards] border-r-[12px] border-cyan-300 shadow-[0_0_80px_rgba(6,182,212,0.6)] flex items-center justify-center">
          <div className="text-white font-black text-4xl tracking-widest uppercase select-none opacity-40 font-sans italic">
            ⚠️ LIQUIDATING DESKTOP GRID 🌊
          </div>
        </div>
      )}

      <Taskbar />

      {/* Styled Tsunami in inline stylesheet */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tsunamiSweep {
          0% { width: 0%; left: 0%; }
          50% { width: 60%; left: 0%; }
          100% { width: 0%; left: 100%; }
        }
      `}} />
    </div>
  );
}

export default Desktop;