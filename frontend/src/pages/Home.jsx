import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Home() {
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <>
      <div>{user.username}</div>
      <p onClick={logoutUser}>Logout</p>
    </>
  )
}

export default Home