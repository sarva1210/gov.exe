import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FakeLoader from "../components/FakeLoader"
import { glitchScreen } from "../effects/glitch"
import { playErrorSound, playSadTrombone } from "../effects/sound"

// Phase timings
const PHASE_DELAYS = [3000, 6000, 10000, 14000]

function Result() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [showAppeal, setShowAppeal] = useState(true)

  // Auto advance phases
  useEffect(() => {
    const timers = PHASE_DELAYS.map((delay, i) =>
      setTimeout(() => setPhase(i + 1), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Sad trombone on Phase 4
  useEffect(() => {
    if (phase === 4) {
      playSadTrombone()
      glitchScreen()
    }
  }, [phase])

  // Submitting
  if (phase === 0) return (
    <div className="h-screen bg-black text-green-400 flex flex-col items-center justify-center gap-8 font-mono">
      <div className="text-6xl animate-spin">⚙</div>
      <h1 className="text-3xl animate-pulse">Submitting application to national server...</h1>
      <p className="text-green-600 text-sm">Please do not close this tab. Or do. We don't care.</p>
    </div>
  )

  // Received
  if (phase === 1) return (
    <div className="h-screen bg-black text-yellow-400 flex flex-col items-center justify-center gap-8 font-mono">
      <div className="text-5xl">📡</div>
      <h1 className="text-3xl animate-pulse">Application received.</h1>
      <p className="text-yellow-300">Preliminary scan in progress...</p>
      <div className="w-64 bg-gray-800 rounded h-4 overflow-hidden">
        <div className="bg-yellow-400 h-4 animate-[grow_6s_ease-in-out_forwards]" style={{ width: "60%" }} />
      </div>
      <p className="text-yellow-600 text-sm">Estimated time remaining: 45–90 business days</p>
    </div>
  )

  // False hope 
  if (phase === 2) return (
    <div className="h-screen bg-black text-green-400 flex flex-col items-center justify-center gap-8 font-mono">
      <div className="text-5xl">✅</div>
      <h1 className="text-4xl text-green-300 animate-bounce">Excellent!</h1>
      <p className="text-2xl">Your application looks <strong>very promising!</strong></p>
      <p className="text-green-600 text-lg">Citizen record verified. Preparing approval...</p>
      <p className="text-green-700 text-sm animate-pulse">Do not refresh. Success imminent.</p>
    </div>
  )

  // Final verification (false hope collapses)
  if (phase === 3) return (
    <div className="h-screen bg-black text-orange-400 flex flex-col items-center justify-center gap-8 font-mono">
      <FakeLoader />
      <h1 className="text-3xl animate-pulse">Final verification in progress...</h1>
      <p className="text-orange-300">Cross-referencing with Ministry of Records (offline since 2011)...</p>
      <p className="text-orange-600 text-sm">Please hold. Your call is important to us.</p>
    </div>
  )

  // REJECTION 
  return (
    <div className="h-screen bg-black text-red-500 flex flex-col items-center justify-center gap-10 px-5 text-center overflow-y-auto py-10">

      <h1 className="text-6xl font-bold animate-bounce glitch">
        APPLICATION REJECTED SUCCESSFULLY
      </h1>

      <p className="text-2xl max-w-3xl">
        Thank you for wasting your valuable time.
        Your complaint has been ignored successfully.
      </p>

      <button
        onClick={() => {
          glitchScreen()
          playErrorSound()
          window.location.href = "/desktop"
        }}
        className="bg-red-700 px-10 py-4 text-white text-2xl hover:scale-110 transition"
      >
        Restart Surveillance
      </button>

      {showAppeal && (
        <button
          onClick={() => {
            alert("Appeal feature is currently in beta and available only to citizens born on February 29th.")
            setShowAppeal(false)
          }}
          className="bg-gray-800 border border-red-500 px-8 py-3 text-red-400 text-lg hover:bg-gray-700 transition"
        >
          File Appeal (Beta)
        </button>
      )}

      <div className="border border-red-800 bg-red-950 text-red-300 p-6 font-mono text-sm max-w-2xl w-full text-left mt-4">
        <p className="mb-2">🔖 <strong>Reference Number:</strong> GOV-NULL-2007-PENDING</p>
        <p className="mb-2">⏱ <strong>Processing Time:</strong> 45–90 business days</p>
        <p className="mb-2">
          📅 <strong>Status Updates:</strong> Visit portal between 11:00–11:15 AM on alternate Tuesdays
        </p>
        <p>
          📠 <strong>Urgent Queries:</strong> Send fax to 011-XXXX-XXXX
          <span className="text-red-500"> (fax machine under repair since 2019)</span>
        </p>
      </div>
    </div>
  )
}

export default Result