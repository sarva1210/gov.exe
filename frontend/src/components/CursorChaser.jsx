import { useEffect, useRef, useState } from "react"

export default function CursorChaser() {
  const [pos,     setPos]     = useState({ x: -100, y: -100 })
  const [hover,   setHover]   = useState(false)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    // Lerp loop (~0.04 factor gives ~300-500ms lag feel)
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.04)
      current.current.y = lerp(current.current.y, target.current.y, 0.04)
      setPos({ x: current.current.x, y: current.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed z-[99990] pointer-events-none select-none"
      style={{
        left: pos.x - 18,
        top:  pos.y - 18,
        transform: "translate(0,0)",
      }}
    >
      {/* Government badge */}
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ pointerEvents: "none" }}
      >
        <div className="w-9 h-9 bg-orange-500 border-2 border-orange-800 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          GOV
        </div>

        {hover && (
          <div className="absolute left-11 top-0 bg-black text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500 whitespace-nowrap">
            You are being monitored.
          </div>
        )}
      </div>
    </div>
  )
}
