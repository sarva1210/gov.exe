import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import eyesVideo from "../assets/eyes.mp4"

function BootScreen() {
  const navigate = useNavigate()
  const [text, setText] = useState("")

  const message =
    "Initializing Government Surveillance..."

  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      setText(message.slice(0, index))
      index++

      if(index > message.length){
        clearInterval(interval)

        setTimeout(() => {
          navigate("/desktop")
        },4000)
      }
    },70)
    return () => clearInterval(interval)
  },[])

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">

      {/* background video */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src={eyesVideo} type="video/mp4"/>
      </video>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* text */}
      <h1 className="relative z-20 text-green-500 text-4xl font-mono glitch text-center px-5"> {text} </h1>

    </div>
  )
}

export default BootScreen