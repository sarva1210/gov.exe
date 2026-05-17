function Popup({ message }) {

  return (
    <div className="absolute top-20 left-20 bg-red-600 text-white p-5 border-4 border-black shadow-2xl animate-bounce z-50">

      <h1 className="text-2xl font-bold">  WARNING </h1>
      <p className="mt-3"> {message} </p>
      <button className="mt-4 bg-black px-4 py-2"> Ignore </button>

    </div>
  )
}

export default Popup