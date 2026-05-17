import { useEffect, useState } from "react"

function FakeLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if(prev >= 99){
          return 99
        }
        return prev + Math.floor(Math.random() * 10)
      })
    },500)
    return () => clearInterval(interval)
  },[])

  return (
    <div className="w-full max-w-lg bg-black border-4 border-green-500 p-4 text-green-500">
      <p className="mb-3"> Installing Government Spyware... </p>

      <div className="w-full bg-gray-800 h-6">
        <div className="bg-green-500 h-full" style={{ width:`${progress}%` }} />
      </div>

      <p className="mt-3"> {progress}% </p>
    </div>
  )
}

export default FakeLoader