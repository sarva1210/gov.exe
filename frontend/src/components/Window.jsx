import Draggable from "react-draggable"
import { useRef, useState } from "react"

function Window({ title, children, pos = { top: 10, left: 15 }, onClose }) {
  const nodeRef = useRef(null)
  const [minimized, setMinimized] = useState(false)
  const [closed, setClosed] = useState(false)

  if(closed) return null

  return (
    <Draggable nodeRef={nodeRef} handle=".window-handle">

      <div
        ref={nodeRef}
        className="absolute w-[500px] bg-gray-200 border-4 border-black shadow-2xl z-40"
        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
      >

        {/* title bar */}
        <div className="window-handle bg-blue-700 text-white px-4 py-2 flex justify-between items-center cursor-move">

          <p className="font-bold"> {title} </p>

          <div className="flex gap-2">

            {/* minimize btn */}
            <button onClick={() => setMinimized(!minimized)} className="bg-yellow-400 px-2 text-black"> - </button>

            {/* close btn */}
            <button onClick={() => { setClosed(true); onClose?.() }} className="bg-red-500 px-2 text-white"> X </button>

          </div>

        </div>

        { !minimized && (
            <div className="p-5">
              {children}
            </div>
          )
        }

      </div>
    </Draggable>
  )
}

export default Window