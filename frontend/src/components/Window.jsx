import Draggable from "react-draggable"
import { useRef } from "react"

function Window({ title, children }) {
  const nodeRef = useRef(null)

  return (
    <Draggable nodeRef={nodeRef}>

      <div ref={nodeRef} className="absolute top-40 left-60 w-[500px] bg-gray-200 border-4 border-black shadow-2xl">

        <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center cursor-move">

          <p className="font-bold"> {title} </p>

          <div className="flex gap-2">
            <button className="bg-yellow-400 px-2"> - </button>
            <button className="bg-red-500 px-2"> X </button>
          </div>

        </div>

        <div className="p-5"> {children} </div>

      </div>
    </Draggable>
  )
}

export default Window