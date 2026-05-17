import { useState } from "react"
import { increaseRage } from "../effects/rageMeter"

function MovingButton() {
  const [position, setPosition] = useState({
    x:0,
    y:0
  })

  const moveButton = () => {
    increaseRage()
    const randomX = Math.floor(Math.random() * 400)
    const randomY = Math.floor(Math.random() * 300)

    setPosition({
      x:randomX,
      y:randomY
 })
  }

  return (
    <button onMouseEnter={moveButton}
      style={{
        transform:`translate(${position.x}px, ${position.y}px)`
      }}
      className="bg-red-600 text-white px-6 py-3 rounded transition-all duration-200">
        Submit
    </button>
  )
}

export default MovingButton