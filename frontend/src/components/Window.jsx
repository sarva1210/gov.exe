import Draggable from "react-draggable"

function Window({ title, children }) {

  return (
    <Draggable>
      <div className="absolute top-40 left-60 w-[500px] bg-gray-200 border-4 border-black shadow-2xl">

        {/* title bar */}
        <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center cursor-move">

          <p className="font-bold"> {title} </p>

          <div className="flex gap-2">
            <button className="bg-yellow-400 px-2"> - </button>
            <button className="bg-red-500 px-2"> X </button>
          </div>

        </div>

        {/* content */}
        <div className="p-5"> {children} </div>
      </div>
    </Draggable>
  )
}

export default Window