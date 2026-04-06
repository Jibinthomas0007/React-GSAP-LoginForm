import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ❌ If not logged in → redirect to login
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // ✅ If logged in → allow access
  return children;
}