import { FaFolder } from "react-icons/fa"

function DesktopIcon({ title, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition w-fit">

      <FaFolder size={45} />
      <p className="text-sm mt-2 text-center"> {title} </p>

    </div>

  )
}

export default DesktopIcon