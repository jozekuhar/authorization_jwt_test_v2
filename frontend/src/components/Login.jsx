import React, { useState, useRef, useContext } from 'react'
import axios from "axios"
import styled from "styled-components"
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const { getUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function loginUser() {
    try {
      setLoading(true)
      const url = "http://localhost:8000/accounts/auth/jwt/create/"
      const response = await axios.post(url, {
        username: username,
        password: password,
      })
      localStorage.setItem("authTokens", JSON.stringify(response.data))
      await getUser()
      navigate("/")
    } catch(error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    loginUser()
  }

  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(prev=>e.target.value)}
        />
        {error && error.username}
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(prev=>e.target.value)}
        />
        {error && error.password}
        {error && error.detail}
        {loading ? <button disabled>Login</button> : <button>Login</button>}
      </LoginForm>
      <Link to="/register">Don't have an account?</Link>
      <Link to="/reset">Forgotten password?</Link>
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

export default Login