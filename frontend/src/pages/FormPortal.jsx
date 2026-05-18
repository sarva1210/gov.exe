import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { playTypingSound, playErrorSound } from "../effects/sound"


const WARNING_POOL = [
  "⚠ Citizen monitored",
  "⚠ Suspicious typing speed detected",
  "⚠ Tax fraud probability: 89%",
  "⚠ Emotional stability not verified",
  "⚠ Session may explode anytime",
  "⚠ Mouse movement pattern flagged as suspicious",
  "⚠ Clipboard contents scanned: 3 violations found",
  "⚠ Browser history submitted to Ministry of Truth",
  "⚠ Keystroke dynamics: IRREGULAR",
  "⚠ Facial recognition: 67% match with known dissidents",
  "⚠ Application classified: PENDING INVESTIGATION",
  "⚠ Screen recording initiated by government mandate",
  "⚠ IP address flagged in 14 countries",
  "⚠ VPN detected: 500 INR fine applied automatically",
  "⚠ Sanity check failed: please contact your nearest collector office",
  "⚠ Biometric vibe: OFF",
  "⚠ Loyalty score recalculating...",
]

// random Sanskrit looking replacement
const randomSanskrit = () => {
  const chars = "अआइईउऊएओकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह"
  return Array.from({ length: 12 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("")
}

function useTypewriter(text, speed = 35) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text])
  return displayed
}

//Single warning line with typewriter
function WarningLine({ text }) {
  const displayed = useTypewriter(text)
  return (
    <p className="flex items-start gap-2">
      <span className="animate-pulse text-red-500 mt-0.5">●</span>
      <span>{displayed}</span>
    </p>
  )
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]
function SlowDatePicker({ value, onChange }) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year,  setYear]  = useState(now.getFullYear())
  const [day,   setDay]   = useState(null)

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setDay(null); onChange(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setDay(null); onChange(null)
  }
  const selectDay = (d) => { setDay(d); onChange(`${d} ${MONTHS[month]} ${year}`) }

  return (
    <div className="border-4 border-black p-3 bg-yellow-50">
      <div className="flex justify-between items-center mb-2 font-bold">
        <button type="button" onClick={prevMonth} className="bg-black text-white px-3 py-1">◀</button>
        <span>{MONTHS[month]} {year}</span>
        <button type="button" onClick={nextMonth} className="bg-black text-white px-3 py-1">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
          <button
            key={d} type="button"
            onClick={() => selectDay(d)}
            className={`p-1 border ${day === d ? "bg-red-600 text-white" : "border-gray-400 hover:bg-yellow-200"}`}
          >{d}</button>
        ))}
      </div>
      {day && <p className="mt-2 text-xs text-gray-600">Selected: {day} {MONTHS[month]} {year}</p>}
    </div>
  )
}


function FormPortal() {
  const navigate = useNavigate()
  const [fullName,   setFullName]   = useState("")
  const [aadhaar,    setAadhaar]    = useState("")
  const [maggi,      setMaggi]      = useState("")
  const [mental,     setMental]     = useState("")
  const [trust,      setTrust]      = useState("")

  const [dob,        setDob]        = useState(null)
  const [motherName, setMotherName] = useState("")
  const [motherNote, setMotherNote] = useState("")
  const [aadhaarFile,setAadhaarFile]= useState(null)
  const [fileMsg,    setFileMsg]    = useState("")
  const [checkboxes, setCheckboxes] = useState({
    exist: false, citizen: false, taxes: false, terms: false, portal: false,
  })

  // field errors
  const [errors, setErrors] = useState({})

  // submit flow
  const [submitAttempts, setSubmitAttempts] = useState(0)

  // session timer (Feature C)
  const [timeLeft, setTimeLeft] = useState(180) // 3:00

  // live warnings (Feature E) 
  const [warnings, setWarnings] = useState(WARNING_POOL.slice(0, 5))

  // Session timer countdown
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          alert("Session expired due to suspicious typing speed. All data has been cleared for your security.")
          setFullName(""); setAadhaar(""); setMaggi(""); setMental("")
          setTrust(""); setDob(null); setMotherName(""); setMotherNote("")
          setCheckboxes({ exist:false,citizen:false,taxes:false,terms:false,portal:false })
          setErrors({})
          playErrorSound()
          return 180
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Rotate warnings every 3 s 
  useEffect(() => {
    const t = setInterval(() => {
      setWarnings(prev => {
        const next = [...prev]
        const replaceIdx = Math.floor(Math.random() * 5)
        let pick = WARNING_POOL[Math.floor(Math.random() * WARNING_POOL.length)]
        while (pick === next[replaceIdx]) {
          pick = WARNING_POOL[Math.floor(Math.random() * WARNING_POOL.length)]
        }
        next[replaceIdx] = pick
        return [...next]
      })
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const ss = String(timeLeft % 60).padStart(2, "0")

  // Field validation 
  const validate = (field, val) => {
    let msg = ""
    if (field === "fullName" && val.trim().split(" ").length < 2)
      msg = "Full name must include first name, last name, and subcaste (minimum 2 words)."
    if (field === "aadhaar" && !/^\d{12}$/.test(val))
      msg = "Aadhaar must be exactly 12 digits. Non-digits attract automatic surcharge."
    if (field === "maggi" && val.trim().length === 0)
      msg = "This field is mandatory. Government requires accurate Maggi preference data."
    if (field === "mental" && val === "Stable")
      msg = "Selecting 'Stable' is considered suspicious. Please reconsider your mental state."
    if (field === "trust" && val.length < 200)
      msg = `Minimum 500 characters required. You have typed ${val.length}.`
    setErrors(e => ({ ...e, [field]: msg }))
  }

  // Confirm dialog chain
  const CONFIRMS = [
    "Are you sure you want to submit this application?",
    "Are you REALLY sure? This is legally binding.",
    "The government will be notified immediately. Proceed?",
    "Your biometric data will be shared with 47 agencies. Continue?",
    "Last chance. Applications cannot be withdrawn. Submit anyway?",
  ]

  const allChecked = Object.values(checkboxes).every(Boolean)

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = CONFIRMS[submitAttempts] ?? null
    if (!msg) { navigate("/result"); return }
    const ok = window.confirm(msg)
    if (!ok) {
      setSubmitAttempts(0)
      alert("Application cancelled. All progress has been saved. (Just kidding — data wiped.)")
      return
    }
    const next = submitAttempts + 1
    setSubmitAttempts(next)
    if (next >= CONFIRMS.length) navigate("/result")
  }

  const handleMotherBlur = () => {
    if (motherName.trim()) {
      setMotherNote("Auto-translated by government AI")
      setMotherName(randomSanskrit())
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAadhaarFile(e.target.files[0].name)
      setFileMsg("File rejected: incorrect emotional resonance.")
    }
  }

  const toggleCheck = (k) => setCheckboxes(c => ({ ...c, [k]: !c[k] }))

  return (
    <div className="min-h-screen bg-yellow-200 p-6 md:p-10 relative overflow-y-auto w-full">

      {/* Session timer — top right (Feature C) */}
      <div className="fixed top-4 right-6 bg-red-700 text-white font-mono px-4 py-2 z-50 text-xl border-4 border-red-900 animate-pulse">
        SESSION EXPIRES: {mm}:{ss}
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-10 text-red-600">
        National Citizen Verification Form
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start justify-center max-w-full">
        {/*  Form panel  */}
        <form onSubmit={handleSubmit} className="bg-white border-8 border-black p-6 md:p-10 w-full max-w-[560px] flex flex-col gap-5">

          <div>
            <input
              type="text" placeholder="Full Name"
              value={fullName}
              onChange={e => { setFullName(e.target.value); playTypingSound() }}
              onBlur={() => validate("fullName", fullName)}
              className="border-4 border-black p-4 w-full"
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="text" placeholder="Aadhaar Number"
              value={aadhaar}
              onChange={e => { setAadhaar(e.target.value); playTypingSound() }}
              onBlur={() => validate("aadhaar", aadhaar)}
              className="border-4 border-black p-4 w-full"
            />
            {errors.aadhaar && <p className="text-red-600 text-sm mt-1">{errors.aadhaar}</p>}
          </div>

          <div>
            <input
              type="text" placeholder="Father's Favorite Maggi Flavor"
              value={maggi}
              onChange={e => { setMaggi(e.target.value); playTypingSound() }}
              onBlur={() => validate("maggi", maggi)}
              className="border-4 border-black p-4 w-full"
            />
            {errors.maggi && <p className="text-red-600 text-sm mt-1">{errors.maggi}</p>}
          </div>

          <div>
            <select
              value={mental}
              onChange={e => setMental(e.target.value)}
              onBlur={() => validate("mental", mental)}
              className="border-4 border-black p-4 w-full"
            >
              <option value="">Select Mental Stability</option>
              <option>Stable</option>
              <option>Unstable</option>
              <option>Government Employee</option>
            </select>
            {errors.mental && <p className="text-red-600 text-sm mt-1">{errors.mental}</p>}
          </div>

          <div>
            <textarea
              placeholder="Why should we trust you?"
              value={trust}
              onChange={e => { setTrust(e.target.value); playTypingSound() }}
              onBlur={() => validate("trust", trust)}
              className="border-4 border-black p-4 h-40 w-full"
            />
            {errors.trust && <p className="text-red-600 text-sm mt-1">{errors.trust}</p>}
          </div>

          <div>
            <label className="font-bold block mb-2">Date of Birth (navigate month by month only)</label>
            <SlowDatePicker value={dob} onChange={setDob} />
          </div>

          <div>
            <input
              type="text"
              placeholder="Mother's maiden name before marriage (Sanskrit transliteration, block capitals)"
              value={motherName}
              onChange={e => { setMotherName(e.target.value); playTypingSound() }}
              onBlur={handleMotherBlur}
              className="border-4 border-black p-4 w-full"
            />
            {motherNote && <p className="text-blue-700 text-sm mt-1 italic">{motherNote}</p>}
          </div>

          <div className="border-4 border-black p-4">
            <p className="font-bold mb-3">Select all that apply (ALL must be checked to submit):</p>
            {[
              ["exist",   "I exist"],
              ["citizen", "I am a citizen"],
              ["taxes",   "I have paid taxes this century"],
              ["terms",   "I agree to terms I have not read"],
              ["portal",  "I acknowledge this portal may not work"],
            ].map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxes[k]}
                  onChange={() => toggleCheck(k)}
                  className="w-5 h-5"
                />
                {label}
              </label>
            ))}
            {!allChecked && (
              <p className="text-red-600 text-sm mt-1">All checkboxes are mandatory by Government Order 47-B.</p>
            )}
          </div>

          <div>
            <label className="font-bold block mb-2">
              Upload Aadhaar (must be exactly 47KB, PDF, scanned at 300 DPI, in grayscale)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border-4 border-black p-2 w-full"
            />
            {fileMsg && <p className="text-red-600 text-sm mt-1">{fileMsg}</p>}
          </div>

          <button
            type="submit"
            disabled={!allChecked}
            className={`py-4 text-xl text-white transition-all ${
              allChecked
                ? "bg-red-600 hover:bg-red-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {submitAttempts === 0
              ? "Submit Application"
              : `Confirm (step ${submitAttempts} of 5)…`}
          </button>
        </form>

        <div className="bg-black text-green-500 p-6 md:p-10 w-full max-w-[500px] h-fit lg:sticky lg:top-10">
          <h2 className="text-3xl mb-5 font-mono">LIVE GOVERNMENT WARNINGS</h2>
          <div className="flex flex-col gap-4 text-lg font-mono">
            {warnings.map((w, i) => (
              <WarningLine key={`${w}-${i}`} text={w} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPortal