import { useState, useEffect, useCallback } from "react"
import Taskbar from "../components/Taskbar"
import DesktopIcon from "../components/DesktopIcon"
import Window from "../components/Window"
import VirusPopup from "../components/VirusPopup"
import FakeAds from "../components/FakeAds"
import BSOD from "../components/BSOD"
import Notification from "../components/Notification"
import Scene from "../three/Scene"
import useChaosStore from "../store/useChaosStore"
import PopupSpawner from "../components/PopupSpawner"
import CookieBanner from "../components/CookieBanner"
import CursorChaser from "../components/CursorChaser"
import { glitchScreen } from "../effects/glitch"
import { playWindowSound, playCashRegister, playStartupJingle } from "../effects/sound"
import VirusCatastrophe from "../components/VirusCatastrophe"

const TICKER_TEXT = "IMPORTANT: Portal under maintenance Jan 1 - Dec 31  |  New Aadhaar rule: must be laminated  |  Fax lines open 11:00–11:15 AM Tuesdays  |  Downloading this page is prohibited  |  Your session is being recorded for quality assurance  |  Citizens found scrolling horizontally will be fined  |  Minister of Digital Affairs congratulates you on using this portal  |  This message will self-destruct in 30 seconds (it will not)"

// helpers 
const randomPos = (existing) => {
  let top, left, attempts = 0
  do {
    top = Math.floor(Math.random() * 35) + 5
    left = Math.floor(Math.random() * 45) + 5
    attempts++
  } while (
    attempts < 20 &&
    existing.some(w => Math.abs(w.top - top) < 6 && Math.abs(w.left - left) < 8)
  )
  return { top, left }
}

// Tax.exe inner component
function TaxExe() {
  const [step, setStep] = useState(1)
  const [income, setIncome] = useState("")
  const [loading, setLoading] = useState(false)
  const [dispute, setDispute] = useState("")
  const tax = income ? Math.ceil(Number(income) * 4.7) + 47000 : 0

  const submitIncome = () => {
    if (!income) return
    setLoading(true)
    playCashRegister()
    setTimeout(() => { setLoading(false); setStep(2) }, 4000)
  }

  const submitDispute = () => setStep(3)

  if (step === 1) return (
    <div className="flex flex-col gap-3">
      <p className="font-bold text-red-700">Annual Income Tax Filing Portal v2007</p>
      <input
        type="number" placeholder="Enter your annual income (₹)"
        value={income} onChange={e => setIncome(e.target.value)}
        className="border-2 border-black p-2"
      />
      {loading
        ? <p className="text-orange-600 animate-pulse">Calculating emotional tax liability...</p>
        : <button onClick={submitIncome} className="bg-red-700 text-white py-2">Calculate Tax</button>
      }
    </div>
  )

  if (step === 2) return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Tax Assessment Result</p>
      <p>Base amount: ₹{Math.ceil(Number(income) * 4.7).toLocaleString()}</p>
      <p className="text-red-600 font-bold">Emotional Distress Surcharge (47%): ₹47,000</p>
      <p className="text-2xl font-bold border-t-2 border-black pt-2">Total: ₹{tax.toLocaleString()}</p>
      <button onClick={submitDispute} className="bg-blue-700 text-white py-2">Dispute Amount</button>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold text-red-700">File Dispute (Form 47-D)</p>
      <textarea
        placeholder="Explain why this tax assessment is unjust..."
        value={dispute} onChange={e => setDispute(e.target.value)}
        className="border-2 border-black p-2 h-28"
      />
      <button onClick={submitDispute} className="bg-red-700 text-white py-2">Submit Dispute</button>
      {step === 3 && (
        <p className="text-red-600 text-sm font-mono animate-pulse">
          Dispute rejected in 0.003 seconds. Government AI has spoken.
        </p>
      )}
    </div>
  )
}

// Ministry of Downloads inner component
function MinistryDownloads() {
  const [prog1, setProg1] = useState(0)
  const [prog2, setProg2] = useState(0)

  const startDownload = (setter, filename, content) => {
    setter(0)
    const t = setInterval(() => {
      setter(p => {
        if (p >= 98) { clearInterval(t); return 98 }
        return Math.min(p + 3, 98)
      })
    }, 90)
    // Create fake file download
    setTimeout(() => {
      const blob = new Blob([content], { type: "text/plain" })
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = filename
      a.click()
    }, 100)
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-blue-800 text-lg">Official Government File Download Portal</p>

      <div>
        <button
          onClick={() => startDownload(
            setProg1,
            "citizen_certificate.pdf",
            "This document is intentionally left blank. Reference: PENDING."
          )}
          className="bg-green-700 text-white py-2 px-4 w-full"
        >
          Download Citizen Certificate (PDF)
        </button>
        {prog1 > 0 && (
          <>
            <div className="mt-2 w-full bg-gray-300 h-4">
              <div className="bg-green-500 h-4 transition-all duration-150" style={{ width: `${prog1}%` }} />
            </div>
            <p className="text-xs text-gray-600 mt-1">
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
          className="bg-blue-700 text-white py-2 px-4 w-full"
        >
          Download Form 27-B
        </button>
        {prog2 > 0 && (
          <>
            <div className="mt-2 w-full bg-gray-300 h-4">
              <div className="bg-blue-500 h-4 transition-all duration-150" style={{ width: `${prog2}%` }} />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {prog2 < 98 ? `Downloading... ${prog2}%` : "Finalizing... (please do not close this window)"}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function Desktop() {
  // openWindows: array of { title, top, left }
  const [openWindows, setOpenWindows] = useState([])
  const [termLine, setTermLine] = useState("ACCESSING CITIZEN DATA...")

  // Virus Scanner state 
  const [threats, setThreats] = useState(69)
  const [virusClicks, setVirusClicks] = useState(0)
  const [catastropheActive, setCatastropheActive] = useState(false)

  // Right-click context menu
  const [ctxMenu, setCtxMenu] = useState(null)

  const rageLevel = useChaosStore(s => s.rageLevel)
  const incrementRage = useChaosStore(s => s.incrementRage)

  const [isShakingActive, setIsShakingActive] = useState(false)
  const isHighRage = rageLevel >= 80

  // Handle intermittent screen shake during high rage
  useEffect(() => {
    if (!isHighRage) {
      setIsShakingActive(false)
      return
    }

    let activeTimeout
    let gapTimeout

    const triggerShake = () => {
      setIsShakingActive(true)

      const shakeDuration = 4000
      activeTimeout = setTimeout(() => {
        setIsShakingActive(false)

        const randomGap = 30000 + Math.random() * 10000
        gapTimeout = setTimeout(() => {
          triggerShake()
        }, randomGap)
      }, shakeDuration)
    }

    triggerShake()

    return () => {
      clearTimeout(activeTimeout)
      clearTimeout(gapTimeout)
    }
  }, [isHighRage])

  //glitch every 10 s 
  useEffect(() => {
    const i = setInterval(glitchScreen, 10000)
    return () => clearInterval(i)
  }, [])


  useEffect(() => {
    const lines = [
      "ACCESSING CITIZEN DATA...", "SCANNING EMOTIONAL HISTORY...",
      "UPLOADING MEMORIES TO CLOUD...", "CALCULATING TAX ON BREATHING...",
      "FLAGGING SUSPICIOUS BLINKING...", "SELLING DATA TO 47 AGENCIES...",
      "REBOOTING DEMOCRACY...", "VERIFYING LOYALTY SCORE...",
    ]
    const i = setInterval(() => {
      setTermLine(lines[Math.floor(Math.random() * lines.length)])
    }, 2000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => { playStartupJingle() }, [])

  const openWindow = useCallback((title) => {
    setOpenWindows(prev => {
      if (prev.find(w => w.title === title)) return prev
      playWindowSound()
      const { top, left } = randomPos(prev)
      return [...prev, { title, top, left }]
    })
  }, [])

  const closeWindow = (title) =>
    setOpenWindows(prev => prev.filter(w => w.title !== title))

  const isOpen = (title) => openWindows.some(w => w.title === title)
  const getPos = (title) => openWindows.find(w => w.title === title) ?? { top: 20, left: 20 }

  const handleVirusClick = () => {
    if (virusClicks >= 3) return
    const next = virusClicks + 1
    setVirusClicks(next)
    setThreats(t => t + Math.floor(Math.random() * 13) + 3)
    incrementRage(10)

    if (next >= 3) {
      setTimeout(() => {
        setCatastropheActive(true)
      }, 1000)
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    setCtxMenu({ x: e.clientX, y: e.clientY })
  }
  const closeCtxMenu = () => setCtxMenu(null)

  // Rage level effects
  const rageStyle = (rageLevel >= 80 && isShakingActive)
    ? { animation: "shake 0.1s infinite", filter: "saturate(3)" }
    : rageLevel >= 80
      ? { filter: "saturate(3)" }
      : rageLevel >= 60
        ? { filter: "hue-rotate(20deg) saturate(2)" }
        : {}

  return (
    <div
      className="h-screen w-full overflow-auto relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 scanlines"
      style={rageStyle}
      onContextMenu={handleContextMenu}
      onClick={closeCtxMenu}
    >
      <div className="w-full bg-red-700 text-white font-mono text-sm py-1 overflow-hidden z-50 relative">
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

      {/* notifications */}
      <Notification text="Citizen monitored" top={20} left={70} />
      <Notification text="Tax fraud probability: 89%" top={40} left={72} />
      <Notification text="Webcam emotionally activated" top={60} left={73} />

      {/*Rage meter */}
      <div
        className={`absolute top-5 right-5 px-5 py-3 border-2 z-50 font-mono transition-all duration-500
          ${rageLevel > 70
            ? "bg-red-600 text-white border-red-300 animate-pulse scale-110"
            : rageLevel > 40
              ? "bg-red-900 text-red-400 border-red-500"
              : "bg-black text-red-500 border-red-500"
          }`}
      >
        Rage Level: {rageLevel}% {rageLevel > 70 && "💀"}
        {rageLevel >= 90 && (
          <p className="text-xs animate-bounce mt-1">SYSTEM CRITICAL — EVACUATE</p>
        )}
      </div>

      <VirusPopup />

      {/*Animated terminal*/}
      <div className="absolute bottom-24 left-5 bg-black text-green-500 p-4 border border-green-500 font-mono z-50 text-sm max-w-xs">
        <span className="opacity-60">{">"} </span>
        {termLine}
        <span className="animate-pulse">_</span>
      </div>

      {/* Desktop icons */}
      <div className="p-5 flex flex-col gap-6 relative z-20">
        <DesktopIcon title="Citizen Login" onClick={() => openWindow("Citizen Login")} />
        <DesktopIcon title="Tax.exe" onClick={() => openWindow("Tax.exe")} />
        <DesktopIcon title="Virus Scanner" onClick={() => openWindow("Virus Scanner")} />
        <DesktopIcon title="National Form" onClick={() => openWindow("National Form")} />
        <DesktopIcon title="Ministry of Downloads" onClick={() => openWindow("Ministry of Downloads")} />
      </div>

      {/*Windows*/}

      {isOpen("Citizen Login") && (
        <Window title="Citizen Login" pos={getPos("Citizen Login")} onClose={() => closeWindow("Citizen Login")}>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Citizen ID" className="border p-2" />
            <input type="password" placeholder="Password" className="border p-2" />
            <button
              onClick={() => window.location.href = "/login"}
              className="bg-blue-700 text-white py-2"
            >Login</button>
          </div>
        </Window>
      )}

      {isOpen("Virus Scanner") && (
        <Window title="Virus Scanner" pos={getPos("Virus Scanner")} onClose={() => closeWindow("Virus Scanner")}>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold text-red-700">
              {virusClicks >= 3
                ? "Antivirus has been infected. RIP. 💀"
                : `${threats} threats detected.`}
            </p>
            {virusClicks < 3 && (
              <button onClick={handleVirusClick} className="bg-red-600 text-white py-2">
                {virusClicks === 0 ? "Remove All Threats" : "Removal Failed. Retry?"}
              </button>
            )}
          </div>
        </Window>
      )}

      {isOpen("Tax.exe") && (
        <Window title="Tax.exe" pos={getPos("Tax.exe")} onClose={() => closeWindow("Tax.exe")}>
          <TaxExe />
        </Window>
      )}

      {isOpen("National Form") && (
        <Window title="National Form" pos={getPos("National Form")} onClose={() => closeWindow("National Form")}>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="border p-2" />
            <select className="border p-2">
              <option>Select Citizenship Status</option>
              <option>Confused</option>
              <option>Emotionally Taxed</option>
              <option>Suspicious</option>
              <option>Probably Fine</option>
            </select>
            <button
              onClick={() => window.location.href = "/form"}
              className="bg-black text-white py-2"
            >Submit Form</button>
          </div>
        </Window>
      )}

      {isOpen("Ministry of Downloads") && (
        <Window title="Official Government File Download Portal" pos={getPos("Ministry of Downloads")} onClose={() => closeWindow("Ministry of Downloads")}>
          <MinistryDownloads />
        </Window>
      )}

      {/* Right-click context menu */}
      {ctxMenu && (
        <div
          className="fixed z-[9999] bg-gray-200 border-2 border-gray-600 shadow-xl font-mono text-sm"
          style={{ top: ctxMenu.y, left: ctxMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {[
            ["Report Suspicious Activity", "Thank you. You have been reported."],
            ["Request Help", "Help is unavailable. Please fill Form 27-B."],
            ["Logout", "Logout disabled for security. Please restart your computer."],
            ["Print Screen (Prohibited)", "Screenshot attempt logged. Fine: 200 INR."],
          ].map(([label, msg]) => (
            <div
              key={label}
              className="px-4 py-2 hover:bg-blue-700 hover:text-white cursor-pointer border-b border-gray-400 last:border-0"
              onClick={() => { alert(msg); closeCtxMenu() }}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {catastropheActive && (
        <VirusCatastrophe
          onComplete={() => {
            setCatastropheActive(false)
            setVirusClicks(0)
            setThreats(69)
          }}
        />
      )}

      <Taskbar />
    </div>
  )
}

export default Desktop