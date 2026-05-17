import { useState, useEffect } from "react"
import Taskbar from "../components/Taskbar"
import DesktopIcon from "../components/DesktopIcon"
import Window from "../components/Window"
import VirusPopup from "../components/VirusPopup"
import FakeAds from "../components/FakeAds"
import BSOD from "../components/BSOD"
import Notification from "../components/Notification"
import Scene from "../three/Scene"
import useChaosStore from "../store/useChaosStore"
import PopupSpawner from "../components/PopupSpawner"
import { glitchScreen } from "../effects/glitch"

function Desktop() {
  const [openWindows, setOpenWindows] = useState([])

  const rageLevel =
    useChaosStore((state) => state.rageLevel)

  const openWindow = (title) => {
    if(openWindows.includes(title)) return
    setOpenWindows([...openWindows, title])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      glitchScreen()
    },10000)
    return () => clearInterval(interval)
  },[])

  return (
    <div className="h-screen w-full overflow-auto relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 scanlines">

      {/* 3JS background */}
      <Scene />

      {/* fake blue screen */}
      <BSOD />

      {/* fake ads */}
      <FakeAds />

      {/* popup spam */}
      <PopupSpawner />

      {/* floating notifications */}
      <Notification text="Citizen monitored" top={20} left={70}/>
      <Notification text="Tax fraud probability: 89%" top={40} left={72}/>
      <Notification text="Webcam emotionally activated" top={60} left={73}/>

      {/* rage meter */}
      <div className="absolute top-5 right-5 bg-black text-red-500 px-5 py-3 border-2 border-red-500 z-50">
        Rage Level: {rageLevel}%
      </div>

      {/* virus popup */}
      <VirusPopup />

      {/* fake terminal */}
      <div className="absolute bottom-24 left-5 bg-black text-green-500 p-4 border border-green-500 font-mono z-50">
        ACCESSING CITIZEN DATA...
      </div>

      {/* desktop icons */}
      <div className="p-5 flex flex-col gap-6 relative z-20">
        <DesktopIcon title="Citizen Login" onClick={() => openWindow("Citizen Login")}/>
        <DesktopIcon title="Tax.exe" onClick={() => openWindow("Tax.exe")}/>
        <DesktopIcon title="Virus Scanner" onClick={() => openWindow("Virus Scanner")}/>
        <DesktopIcon title="National Form" onClick={() => openWindow("National Form")}/>
      </div>

      {/* login window */}
      {openWindows.includes("Citizen Login") && (
        <Window title="Citizen Login">
          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Citizen ID"
              className="border p-2"
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2"
            />

            <button onClick={() => window.location.href="/login"} className="bg-blue-700 text-white py-2"> Login </button>
          </div>
        </Window>
      )}

      {/* virus scanner */}
      {openWindows.includes("Virus Scanner") && (
        <Window title="Virus Scanner">
          <div className="flex flex-col gap-3">
            <p className="text-lg"> 69 threats detected. </p>
            <button className="bg-red-600 text-white py-2"> Remove All Threats </button>
          </div>
        </Window>
      )}

      {/* tax window */}
      {openWindows.includes("Tax.exe") && (
        <Window title="Tax.exe">
          <p>
            Your taxes are emotionally overdue.
          </p>
        </Window>
      )}

      {/* national form */}
      {openWindows.includes("National Form") && (
        <Window title="National Form">
          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-2"
            />

            <select className="border p-2">
              <option>
                Select Citizenship Status
              </option>

              <option>
                Confused
              </option>

              <option>
                Emotionally Taxed
              </option>
            </select>

            <button
              onClick={() => window.location.href="/form"}
              className="bg-black text-white py-2">
              Submit Form
            </button>
          </div>
        </Window>
      )}
      <Taskbar />
    </div>
  )
}

export default Desktop