import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function BootScreen() {

  const navigate = useNavigate()

  const [text, setText] = useState("")

  const message =
    "Initializing Government Surveillance System..."

  useEffect(() => {

    let index = 0

    const interval = setInterval(() => {

      setText(message.slice(0, index))

      index++

      if(index > message.length){
        clearInterval(interval)

        setTimeout(() => {
          navigate("/desktop")
        },2000)
      }

    },70)

    return () => clearInterval(interval)

  },[])

  return (
    <div className="h-screen bg-black flex items-center justify-center text-green-500 text-3xl font-mono">
      {text}
    </div>
  )
}

export default BootScreen