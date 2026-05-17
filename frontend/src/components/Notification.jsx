import { motion } from "framer-motion"

function Notification({ text, top, left }) {
  return (
    <motion.div

      initial={{
        opacity:0,
        scale:0.5,
        x:100
      }}

      animate={{
        opacity:1,
        scale:1,
        x:0
      }}

      transition={{
        duration:0.5
      }} className="absolute bg-black border-2 border-green-500 text-green-500 p-4 w-80 shadow-2xl"

      style={{
        top:`${top}%`,
        left:`${left}%`
      }}
    >

      <h1 className="font-bold text-lg">  GOV.EXE ALERT </h1>
      <p className="mt-2"> {text} </p>

    </motion.div>
  )
}

export default Notification