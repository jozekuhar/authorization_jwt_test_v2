import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ResetPassword from "./components/ResetPassword"
import ResetPasswordConfirm from "./components/ResetPasswordConfirm"
import ActivateAccountConfirm from "./components/ActivateAccountConfirm"
import Home from "./pages/Home"
import AnonymousRoute from "./utils/AnonymousRoute"
import PrivateRoute from "./utils/PrivateRoute"
import ActivateAccount from "./components/ActivateAccount"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/login" element={<AnonymousRoute><Login /></AnonymousRoute>} />
      <Route path="/reset" element={<AnonymousRoute><ResetPassword /></AnonymousRoute>} />
      <Route path="/reset/:uid/:token" element={<AnonymousRoute><ResetPasswordConfirm /></AnonymousRoute>} />
      <Route path="/activate" element={<AnonymousRoute><ActivateAccount /></AnonymousRoute>} />
      <Route path="/activate/:uid/:token" element={<AnonymousRoute><ActivateAccountConfirm /></AnonymousRoute>} />
      <Route path="/register" element={<AnonymousRoute><Register /></AnonymousRoute>} />
    </Routes>
    </>
  )
}

export default App
