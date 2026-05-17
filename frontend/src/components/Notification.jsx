import { motion } from "framer-motion"

function Notification({ text }) {
  return (
    <motion.div
      initial={{ x:300, opacity:0 }}
      animate={{ x:0, opacity:1 }}
      exit={{ opacity:0 }}
      className="bg-black border-2 border-green-500 text-green-500 p-4 w-80 shadow-2xl"
    >

      <h1 className="font-bold text-lg"> GOV.EXE ALERT </h1>
      <p className="mt-2"> {text} </p>

    </motion.div>
  )
}

export default Notification