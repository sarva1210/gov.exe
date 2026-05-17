import { useEffect, useState } from "react"
import { playBSODSound } from "../effects/sound"

function BSOD() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
      playBSODSound()
      setTimeout(() => setShow(false), 3000)
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-blue-700 text-white z-[99999] flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-7xl font-bold">:(</h1>
      <p className="text-3xl mt-10">Your citizenship ran into a problem.</p>
      <p className="mt-5">Collecting emotional damage...</p>
      <p className="mt-3 text-sm opacity-60">Stop code: EMOTIONAL_INSTABILITY_0x0042</p>
    </div>
  )
}

export default BSOD