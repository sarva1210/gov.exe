import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MovingButton from "../components/MovingButton"
import { glitchScreen } from "../effects/glitch"

function Login() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const fakeRules = [
    "Must contain 4 emojis",
    "Must contain government secrets",
    "Must contain your blood type",
    "Must not contain vowels"
  ]

  return (
    <div className="h-screen bg-black text-green-500 flex flex-col items-center justify-center gap-6 px-5">

      <h1 className="text-5xl font-bold animate-pulse"> Citizen Login Portal </h1>

      <div className="bg-gray-900 border-4 border-green-500 p-10 w-full max-w-xl flex flex-col gap-5">

        <input type="text" placeholder="Citizen ID" className="bg-black border border-green-500 p-3 outline-none"/>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black border border-green-500 p-3 outline-none" />

        <div className="text-red-500 text-sm flex flex-col gap-2">
          {fakeRules.map((rule,index) => (
            <p key={index}> • {rule} </p>
          ))}
        </div>

        <button onClick={glitchScreen} className="bg-red-700 py-3 text-white">
          Verify Identity
        </button>

        <div className="flex justify-center pt-5">
          <MovingButton />
        </div>

        <button onClick={() => navigate("/form")} className="bg-green-600 py-3 text-white mt-5" > Emergency Backup Login </button>

      </div>
    </div>
  )
}

export default Login    