import { createContext, useState, useEffect } from "react";
import axios from "axios"

const AuthContext = createContext()

function AuthProvider({children}) {
  const [firstVisit, setFirstVisit] = useState(true)
  const [user, setUser] = useState(null)

  async function getUser() {
    try {
      const url = "http://localhost:8000/accounts/auth/users/me/"
      const response = await axios.get(url, {
        headers: {
          "Authorization": "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access
        }
      })
      setUser(response.data)
    } catch(error) {
      console.log(error)
    } finally {

    }
  }

  async function updateToken() {
    if (localStorage.getItem("authTokens")) {
      try {
        const url = "http://localhost:8000/accounts/auth/jwt/refresh/"
        const response = await axios.post(url, {
          "refresh": JSON.parse(localStorage.getItem("authTokens")).refresh
        })
        localStorage.setItem("authTokens", JSON.stringify(response.data))
        await getUser()
      } catch(error) {
        console.log(error)
      }
    }
    if (firstVisit) {
      setFirstVisit(false)
    }
  }

  function logoutUser() {
    localStorage.removeItem("authTokens")
    setUser(null)
  }

  useEffect(() => {
    if (firstVisit) {
      updateToken()
    }
    
    const fourMinutes = 1000 * 60 * 4
    const interval = setInterval(() => {
      updateToken()
    }, fourMinutes)

    return () => clearInterval(interval)
  }, [])

  const context = {
    user: user,
    getUser: getUser,
    logoutUser: logoutUser,
  }

  return (
    <AuthContext.Provider value={context}>
      {firstVisit ? null : children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider,
}