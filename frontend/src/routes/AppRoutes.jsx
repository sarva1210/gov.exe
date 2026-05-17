import { Routes, Route } from "react-router-dom"
import BootScreen from "../pages/BootScreen"
import Desktop from "../pages/Desktop"
import Login from "../pages/Login"
import FormPortal from "../pages/FormPortal"
import Result from "../pages/Result"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BootScreen />} />

      <Route path="/desktop" element={<Desktop />} />

      <Route path="/login" element={<Login />} />

      <Route path="/form" element={<FormPortal />} />

      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default AppRoutes