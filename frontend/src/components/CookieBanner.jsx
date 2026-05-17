import { useState, useEffect } from "react"

const COOKIE_KEY = "gov_exe_cookies_accepted"

const CATEGORIES = [
  "Emotional Analytics", "Dream Data Collection", "Biometric Vibes",
  "Subconsciousness Tracking", "Patriotism Monitoring", "Anger Profiling",
  "Sleep Pattern Analysis", "Grocery Habit Surveillance", "Blink Rate Recording",
  "Loyalty Score Computation", "Thought Pattern Indexing", "Aura Scanning",
  "Social Credit Mapping", "Existential Dread Logging", "Nostril Preference Data",
  "Favourite Colour Transmission", "Childhood Memory Extraction", "Digestive Rhythm Sync",
  "Micro-Expression Harvesting", "Soul Fragmentation Index", "Ambient Noise Capture",
  "Screen Time Emotional Impact", "Keyboard Pressure Analytics", "Cursor Hesitation Log",
  "Font Preference Profiling", "Scroll Speed Sentiment", "Tab Count Psychology",
  "Browser Language Feelings", "Window Resize Intent", "Double-Click Aggression",
  "Copy-Paste Frequency", "Autocomplete Surrender Rate", "404 Emotional Response",
  "Loading Screen Patience", "CAPTCHA Failure Shame", "Timezone Existential Data",
  "Battery Level Anxiety", "Wi-Fi Signal Sadness", "Notification Dismissal Trauma",
  "Ad Blindness Quotient", "Incognito Mode Guilt", "Bookmark Hoarding Index",
  "Extension Count Paranoia", "History Deletion Frequency", "Dark Mode Mood Correlation",
  "Zoom Level Self-Esteem", "Typing Speed Confidence",
]

export default function CookieBanner() {
  const [visible,      setVisible]      = useState(false)
  const [showCustom,   setShowCustom]   = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem(COOKIE_KEY, "1")
    setVisible(false)
    setShowCustom(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Main banner */}
      <div
        className="fixed bottom-0 left-0 w-full bg-gray-900 text-white border-t-4 border-red-600 z-[99998] p-5"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-lg font-bold mb-1">
          🍪 This portal uses <strong>47 mandatory cookies</strong> required by Government Order 47-B.
        </p>
        <p className="text-sm text-gray-400 mb-4">
          These cookies are non-optional. Refusal to accept constitutes suspicious behaviour and will be logged.
        </p>

        {/* 47 toggle grid */}
        <div className="grid grid-cols-4 gap-1 mb-4 max-h-36 overflow-y-auto pr-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-xs bg-gray-800 px-2 py-1 rounded cursor-not-allowed">
              <input type="checkbox" checked readOnly className="accent-red-500" />
              <span className="truncate">{cat}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={acceptAll}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-bold transition"
          >
            Accept Necessary Only
          </button>
          <button
            onClick={() => setShowCustom(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 transition"
          >
            Customise Preferences
          </button>
        </div>
      </div>

      {/* Customise modal */}
      {showCustom && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70">
          <div
            className="bg-gray-900 text-white border-4 border-red-600 p-6 w-[700px] max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2">Customise Cookie Preferences</h2>
            <p className="text-sm text-red-400 mb-4">
              All preferences are locked ON by Government Order 47-B. They cannot be disabled.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded opacity-70 cursor-not-allowed">
                  <span className="text-sm">{cat}</span>
                  <div className="relative group">
                    <input
                      type="checkbox" checked readOnly
                      className="accent-red-500 cursor-not-allowed"
                    />
                    <span className="absolute right-6 top-0 bg-black text-yellow-400 text-xs px-2 py-1 rounded whitespace-nowrap hidden group-hover:block border border-yellow-600">
                      Required by Government Order 47-B
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={acceptAll}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold transition"
            >
              Accept All (the only option)
            </button>
          </div>
        </div>
      )}
    </>
  )
}
