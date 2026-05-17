import FakeLoader from "../components/FakeLoader"
import { glitchScreen } from "../effects/glitch"
import { playErrorSound } from "../effects/sound"

function Result() {
  return (
    <div className="h-screen bg-black text-red-500 flex flex-col items-center justify-center gap-10 px-5 text-center">
      <FakeLoader />

      <h1 className="text-6xl font-bold animate-bounce"> APPLICATION REJECTED SUCCESSFULLY </h1>
      <p className="text-2xl max-w-3xl"> Thank you for wasting your valuable time. Your complaint has been ignored successfully. </p>
      <button onClick={() => {
          glitchScreen()
          playErrorSound() 
        }} className="bg-red-700 px-10 py-4 text-white text-2xl hover:scale-110 transition"> Cry Again </button>

    </div>
  )
}

export default Result