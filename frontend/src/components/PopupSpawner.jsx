import { useEffect, useState } from "react"

function PopupSpawner() {
  const [popups, setPopups] = useState([])

  const messages = [
    "DOWNLOAD MORE RAM",
    "Democracy not responding",
    "Citizen tracked successfully",
    "Virus upgraded",
    "Tax fraud detected",
    "Government watching enabled"
  ]

  useEffect(() => {
    const interval = setInterval(() => {

      const popup = {
        id:Date.now(),

        text:
          messages[
            Math.floor(Math.random() * messages.length)
          ],

        top:Math.random() * 80,
        left:Math.random() * 80
      }

      setPopups((prev) => [...prev, popup])
    },7000)

    return () => clearInterval(interval)
  },[])

  return (
    <>
      { popups.map((popup) => (
          <div
            key={popup.id}
            className="absolute bg-red-600 text-white px-4 py-3 border-4 border-black z-50 animate-bounce"
            style={{
              top:`${popup.top}%`,
              left:`${popup.left}%`
            }}>
            {popup.text}
          </div>
        ))
      }
    </>
  )
}

export default PopupSpawner