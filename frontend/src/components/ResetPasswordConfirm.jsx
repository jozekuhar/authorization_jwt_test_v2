import React, { useState, useRef, useContext } from 'react'
import axios from "axios"
import styled from "styled-components"
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link, useParams } from 'react-router-dom'

function ResetPasswordConfirm() {
  const { getUser } = useContext(AuthContext)
  const { uid, token } = useParams()
  const navigate = useNavigate()

  console.log(uid, token)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [newPassword, setNewPassword] = useState("")

  async function confirmPassword() {
    try {
      setLoading(true)
      const url = "http://127.0.0.1:8000/accounts/auth/users/reset_password_confirm/"
      const response = await axios.post(url, {
        uid: uid,
        token: token,
        new_password: newPassword
      })
      navigate("/login")
    } catch(error) {
      console.log(error)
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    confirmPassword()
  }

  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <input 
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(prev=>e.target.value)}
        />
        {error && error.uid}
        {error && error.token}
        {error && error.new_password}
        {error && error.detail}
        {success}
        {loading ? <button disabled>Reset Password</button> : <button>Reset Password</button>}
      </LoginForm>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
`

export default ResetPasswordConfirm