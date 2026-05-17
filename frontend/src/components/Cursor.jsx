import { useEffect, useState } from "react"

function Cursor() {
  const [position, setPosition] = useState({
    x:0,
    y:0
  })

  useEffect(() => {

    const moveCursor = (e) => {
      setPosition({
        x:e.clientX,
        y:e.clientY
      })

    }

    window.addEventListener("mousemove", moveCursor)

    return () =>
      window.removeEventListener("mousemove", moveCursor)

  },[])

  return (
    <div
      id="chaos-cursor"
      className="fixed z-[9999] w-6 h-6 bg-red-500 rounded-full pointer-events-none mix-blend-difference shadow-[0_0_25px_red]"
      style={{
        left:position.x,
        top:position.y,
        transform:"translate(-50%,-50%)"
      }}
    />
  )
}

export default Cursor