import { playErrorSound } from "../effects/sound"
import { glitchScreen } from "../effects/glitch"

function FakeAds() {
  const ads = [
    "DOWNLOAD MORE RAM",
    "YOU WON ₹5000",
    "FREE GOVERNMENT WIFI",
    "CLICK HERE FOR VIRUS"
  ]

  const handleAdClick = () => {
    playErrorSound()
    glitchScreen()

    alert(
      "Citizen data sold successfully 😭"
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none">

      { ads.map((ad,index) => (
          <button key={index} onClick={handleAdClick} className="absolute bg-yellow-400 text-black px-4 py-2 font-bold animate-bounce border-4 border-black pointer-events-auto hover:scale-110 transition"

            style={{
              top:`${Math.random() * 90}%`,
              left:`${Math.random() * 90}%`
            }}> {ad} </button>
        ))
      }
    </div>
  )
}

export default FakeAds