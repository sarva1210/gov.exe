import { BrowserRouter } from "react-router-dom"
import { useEffect } from "react"
import Cursor from "./components/Cursor"
import AppRoutes from "./routes/AppRoutes"
import { cursorChaos } from "./effects/cursorChaos"

function App() {
  useEffect(() => {
    cursorChaos()
  },[])

  return (
    <BrowserRouter>

      <Cursor />

      <AppRoutes />

    </BrowserRouter>
  )
}

export default App