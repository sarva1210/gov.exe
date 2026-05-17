import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import MovingButton from "../components/MovingButton"
import { glitchScreen } from "../effects/glitch"
import { playTypingSound, playErrorSound } from "../effects/sound"

function Login() {
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [attemptCount,   setAttemptCount]   = useState(0)
  const [revealedCount,  setRevealedCount]  = useState(0)   // how many new rules visible
  const [errorMsg,       setErrorMsg]       = useState("")

  // Citizen ID debounce
  const [citizenId,      setCitizenId]      = useState("")
  const [citizenIdNote,  setCitizenIdNote]  = useState("")
  const citizenTimerRef = useRef(null)

  // fakeRules :  existing 4 always visible + 4 new revealed progressively
  const baseRules = [
    "Must contain 4 emojis",
    "Must contain government secrets",
    "Must contain your blood type",
    "Must not contain vowels",
  ]

  const newRules = [
    "Must be exactly 47 characters long",
    "Must contain your mother's maiden name in reverse",
    "Must not contain the letter 'e'",
    "Must be submitted in Sanskrit transliteration",
  ]

  const visibleNewRules = newRules.slice(0, revealedCount)

  // password auto-clears every 15 seconds 
  useEffect(() => {
    const t = setInterval(() => {
      setPassword("")
    }, 15000)
    return () => clearInterval(t)
  }, [])

  // Citizen ID 3-second debounce
  const handleCitizenIdChange = (e) => {
    const val = e.target.value
    setCitizenId(val)
    setCitizenIdNote("")
    playTypingSound()
    if (citizenTimerRef.current) clearTimeout(citizenTimerRef.current)
    citizenTimerRef.current = setTimeout(() => {
      setCitizenId("CIT-2007-ERR-NULL")
      setCitizenIdNote("Auto-corrected by government AI system.")
    }, 3000)
  }

  const handleVerify = () => {
    glitchScreen()
    const next = attemptCount + 1
    setAttemptCount(next)

    // first 2 clicks  glitchScreen only, no consequence
    if (next <= 2) return

    //attempt 9+ -> redirect to /result (logged in rejected)
    if (next >= 9) {
      playErrorSound()
      navigate("/result")
      return
    }

    // From click 3 onward: reveal rules + show error
    const errorN = next - 2  

    if (revealedCount < newRules.length) {
      setRevealedCount(r => r + 1)
      setErrorMsg(`Password rejected. New compliance requirement added. (Attempt ${errorN} of 8)`)
    } else {
      setErrorMsg(
        "Maximum attempts exceeded. Please visit your nearest office between 11:00–11:15 AM on alternate Tuesdays."
      )
    }
    playErrorSound()
  }

  return (
    <div className="h-screen bg-black text-green-500 flex flex-col items-center justify-center gap-6 px-5">
      <h1 className="text-5xl font-bold animate-pulse">Citizen Login Portal</h1>

      <div className="bg-gray-900 border-4 border-green-500 p-10 w-full max-w-xl flex flex-col gap-5">

        {/*Citizen ID */}
        <div>
          <input
            type="text"
            placeholder="Citizen ID"
            value={citizenId}
            onChange={handleCitizenIdChange}
            className="bg-black border border-green-500 p-3 outline-none w-full"
          />
          {citizenIdNote && (
            <p className="text-red-500 text-xs mt-1">{citizenIdNote}</p>
          )}
        </div>

        {/* Password (clears every 15 s)*/}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            playTypingSound()
          }}
          className="bg-black border border-green-500 p-3 outline-none"
        />

        {/* Password rules */}
        <div className="text-red-500 text-sm flex flex-col gap-2">
          {baseRules.map((rule, i) => (
            <p key={i}>• {rule}</p>
          ))}
          {visibleNewRules.map((rule, i) => (
            <p key={`new-${i}`} className="animate-pulse">• {rule}</p>
          ))}
        </div>

        {/* Error message (Feature A) */}
        {errorMsg && (
          <div className="bg-red-950 border border-red-500 text-red-400 text-sm p-3 font-mono">
            ⛔ {errorMsg}
          </div>
        )}

        {/*Verify Identity button*/}
        <button
          onClick={handleVerify}
          className="bg-red-700 py-3 text-white hover:bg-red-600 transition"
        >
          Verify Identity
        </button>

        {/*Moving button*/}
        <div className="flex justify-center pt-5">
          <MovingButton />
        </div>

        {/*Emergency Backup Login */}
        <button
          onClick={() => navigate("/form")}
          className="bg-green-600 py-3 text-white mt-5"
        >
          Emergency Backup Login
        </button>
      </div>
    </div>
  )
}

export default Login