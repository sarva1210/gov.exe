import { useState } from "react"
import useChaosStore from "../store/useChaosStore"
import { playDodgeSound } from "../effects/sound"

function MovingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const increaseRage = useChaosStore((state) => state.increaseRage)

  const moveButton = () => {
    increaseRage()
    playDodgeSound()
    const randomX = Math.floor(Math.random() * 300)
    const randomY = Math.floor(Math.random() * 200)
    setPosition({ x: randomX, y: randomY })
  }

  return (
    <button
      onMouseEnter={moveButton}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="bg-red-600 text-white px-6 py-3 rounded transition-all duration-200"
    >
      Submit
    </button>
  )
}

export default MovingButton