import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Dashboard from "./Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import AuthPage from "./AuthPage"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  )
}