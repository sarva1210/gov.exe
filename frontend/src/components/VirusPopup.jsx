import { useEffect, useState } from "react"
import { playErrorSound } from "../effects/sound"
import { glitchScreen } from "../effects/glitch"

function VirusPopup() {
  const [show, setShow] = useState(false)
  const [crash, setCrash] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    },3000)
    return () => clearTimeout(timer)
  },[])

  const handleIgnore = () => {
    playErrorSound()
    glitchScreen()
    setCrash(true)

    setTimeout(() => {
      setCrash(false)
      setShow(false)
    },2000)
  }

  if(!show) return null

  return (
    <>
      {/* fake crash screen */}
      { crash && (
          <div className="fixed inset-0 bg-blue-700 text-white z-[99999] flex flex-col items-center justify-center text-center p-10">
            <h1 className="text-7xl font-bold"> :( </h1>
            <p className="text-3xl mt-10"> Your system ran into a problem. </p>
            <p className="mt-5"> Restarting citizen surveillance... </p>
          </div>
        )
      }

      {/* popup */}
      <div className="absolute top-10 right-10 bg-red-700 text-white p-5 border-4 border-black z-50 animate-bounce">
        <h1 className="text-xl font-bold"> VIRUS DETECTED </h1>
        <p className="mt-2"> Citizen data compromised. </p>
        <button onClick={handleIgnore} className="mt-4 bg-black px-4 py-2"> Ignore Warning </button>
      </div>
    </>
  )
}

export default VirusPopup