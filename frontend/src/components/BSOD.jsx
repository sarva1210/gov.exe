import { useEffect, useState } from "react"

function BSOD() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)

      setTimeout(() => {
        setShow(false)
      },2000)
    },15000)
    return () => clearTimeout(timer)
  },[])

  if(!show) return null

  return (
    <div className="fixed inset-0 bg-blue-700 text-white z-[99999] flex flex-col items-center justify-center text-center p-10">

      <h1 className="text-7xl font-bold"> :(  </h1>
      <p className="text-3xl mt-10"> Your citizenship ran into a problem. </p>
      <p className="mt-5"> Collecting emotional damage... </p>

    </div>
  )
}

export default BSOD