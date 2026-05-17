import { useMemo } from "react"
import { playAdSound } from "../effects/sound"
import { glitchScreen } from "../effects/glitch"
import useChaosStore from "../store/useChaosStore"

function FakeAds() {
  const increaseRage = useChaosStore((state) => state.increaseRage)

  const ads = useMemo(() => [
    { text: "DOWNLOAD MORE RAM",    top: 12, left: 18 },
    { text: "YOU WON ₹5000 💸",     top: 55, left: 62 },
    { text: "FREE GOVERNMENT WIFI", top: 28, left: 78 },
    { text: "CLICK HERE FOR VIRUS", top: 72, left: 8  },
  ], [])

  const handleAdClick = () => {
    playAdSound()
    glitchScreen()
    increaseRage()
    alert("Citizen data sold successfully 😭")
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {ads.map((ad, index) => (
        <button
          key={index}
          onClick={handleAdClick}
          className="absolute bg-yellow-400 text-black px-4 py-2 font-bold animate-bounce border-4 border-black pointer-events-auto hover:scale-110 transition text-xs"
          style={{ top: `${ad.top}%`, left: `${ad.left}%` }}
        >
          {ad.text}
        </button>
      ))}
    </div>
  )
}

export default FakeAds