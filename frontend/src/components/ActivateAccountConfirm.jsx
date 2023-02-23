import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ActivateAccountConfirm() {
  const { uid, token } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function confirmActivate() {
    try {
      setLoading(true)
      const url = "http://127.0.0.1:8000/accounts/auth/users/activation/"
      const response = await axios.post(url, {
        uid: uid,
        token: token
      })
      navigate("/login")
    } catch(error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    confirmActivate()
  })
 
  return (
    <>
    </>
  )
}

export default ActivateAccountConfirm