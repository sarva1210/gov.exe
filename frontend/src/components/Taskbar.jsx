function Taskbar() {
  const time = new Date().toLocaleTimeString()

  return (
    <div className=" absolute bottom-0 left-0 w-full h-14 bg-black/70 backdrop-blur-md flex items-center justify-between px-5 text-white ">

      <button className=" bg-green-600  px-5  py-1  rounded  font-bold "> Start </button>
      <p>{time}</p>

    </div>
  )
}

export default Taskbar