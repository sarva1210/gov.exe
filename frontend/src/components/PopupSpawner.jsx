import { useEffect, useState } from "react"
import { playPopupSound } from "../effects/sound"
import useChaosStore from "../store/useChaosStore"

function PopupSpawner() {
  const [popups, setPopups] = useState([])
  const increaseRage = useChaosStore((state) => state.increaseRage)

  const messages = [
    "Democracy not responding",
    "Citizen tracked successfully",
    "Virus upgraded to Premium",
    "Tax fraud detected",
    "Government watching enabled",
    "Your face has been sold",
    "Emotion scan: SUSPICIOUS",
    "Please hold — bribing officer",
    "Form 7B required for Form 7B",
    "Reticulating government splines...",
    "Citizenship score: -42",
    "Your thoughts are being audited",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now()
      const popup = {
        id,
        text: messages[Math.floor(Math.random() * messages.length)],
        top: Math.random() * 75,
        left: Math.random() * 75,
      }
      setPopups((prev) => [...prev, popup])
      playPopupSound()
      increaseRage()

      setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== id))
      }, 2500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="absolute bg-red-600 text-white px-4 py-3 border-4 border-black z-50 animate-bounce text-sm font-bold"
          style={{ top: `${popup.top}%`, left: `${popup.left}%` }}
        >
          ⚠ {popup.text}
        </div>
      ))}
    </>
  )
}

export default PopupSpawner