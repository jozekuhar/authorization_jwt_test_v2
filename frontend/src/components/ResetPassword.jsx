import React, { useState, useRef, useContext } from 'react'
import axios from "axios"
import styled from "styled-components"
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function ResetPassword() {
  const { getUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [email, setEmail] = useState("")

  async function resetPassword() {
    try {
      setLoading(true)
      const url = "http://127.0.0.1:8000/accounts/auth/users/reset_password/"
      const response = await axios.post(url, {
        email: email,
      })
      setSuccess("If we found account with this email in our database we've sent you email with instructions.")
    } catch(error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    resetPassword()
  }

  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(prev=>e.target.value)}
        />
        {error && error.email}
        {error && error.detail}
        {success}
        {loading ? <button disabled>Reset Password</button> : <button>Reset Password</button>}
      </LoginForm>
      <Link to="/register">Don't have an account?</Link>
      <Link to="/login">Login instead?</Link>
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

export default ResetPassword