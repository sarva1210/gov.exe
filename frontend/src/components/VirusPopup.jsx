import { useEffect, useState } from "react"
import { playErrorSound } from "../effects/sound"

function VirusPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    },3000)

    return () => clearTimeout(timer)
  },[])

  if(!show) return null

  return (
    <div className="absolute top-10 right-10 bg-red-700 text-white p-5 border-4 border-black z-50 animate-bounce">

      <h1 className="text-xl font-bold"> VIRUS DETECTED </h1>
      <p className="mt-2"> Citizen data compromised. </p>
      <button onClick={playErrorSound} className="mt-4 bg-black px-4 py-2"> Ignore Warning </button>

    </div>
  )
}

export default VirusPopup