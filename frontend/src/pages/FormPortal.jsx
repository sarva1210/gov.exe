import { useNavigate } from "react-router-dom"

function FormPortal() {
  const navigate = useNavigate()

  return (
    <div className="h-screen overflow-x-scroll bg-yellow-200 p-10 min-w-[2000px]">

      <h1 className="text-6xl font-bold mb-10 text-red-600"> National Citizen Verification Form </h1>

      <div className="flex gap-20">
        <div className="bg-white border-8 border-black p-10 w-[500px] flex flex-col gap-5">

          <input type="text" placeholder="Full Name" className="border-4 border-black p-4"/>

          <input type="text" placeholder="Aadhaar Number" className="border-4 border-black p-4"/>

          <input type="text" placeholder="Father's Favorite Maggi Flavor" className="border-4 border-black p-4"/>

          <select className="border-4 border-black p-4">
            <option>Select Mental Stability</option>
            <option>Stable</option>
            <option>Unstable</option>
            <option>Government Employee</option>
          </select>

          <textarea placeholder="Why should we trust you?" className="border-4 border-black p-4 h-40" />

          <button
            onClick={() => navigate("/result")}
            className="bg-red-600 text-white py-4 text-xl">
            Submit Application
          </button>
        </div>

        <div className="bg-black text-green-500 p-10 w-[500px] h-fit">
          <h2 className="text-3xl mb-5"> LIVE GOVERNMENT WARNINGS </h2>

          <div className="flex flex-col gap-4 text-lg">
            <p>⚠ Citizen monitored</p>
            <p>⚠ Suspicious typing speed detected</p>
            <p>⚠ Tax fraud probability: 89%</p>
            <p>⚠ Emotional stability not verified</p>
            <p>⚠ Session may explode anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPortal