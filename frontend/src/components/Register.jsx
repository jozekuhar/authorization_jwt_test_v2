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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  async function registerUser() {
    try {
      setLoading(true)
      const url = "http://localhost:8000/accounts/auth/users/"
      const response = await axios.post(url, {
        username: username,
        email: email,
        password: password,
        re_password: rePassword,
      })
      await loginUser()
    } catch(error) {
      console.log(error.response.data)
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

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

  function handleRegister(e) {
    e.preventDefault()
    registerUser()
  }

  return (
    <Container>
      <LoginForm onSubmit={handleRegister}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(prev=>e.target.value)}
        />
        {error && error.username}
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(prev=>e.target.value)}
        />
        {error && error.email}
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(prev=>e.target.value)}
        />
        {error && error.password}
        <input 
          type="password"
          placeholder="Retype Password"
          value={rePassword}
          onChange={(e) => setRePassword(prev=>e.target.value)}
        />
        {error && error.detail}
        {loading ? <button disabled>Register</button> : <button>Register</button>}
      </LoginForm>
      <Link to="/login">Login</Link>
      <Link to="/activate">Get Activation email</Link>
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