// Stupid login form just for logging in
// Don't use any part of this code as a reference
// Delete this after the proper login page is Implemented

import { apiClient } from 'common/utils/api'
import React from 'react'

const LoginPage = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as any
        const payload = {
          email: form.elements.email.value,
          password: form.elements.password.value,
        }
        apiClient.post('/auth/login', payload)
      }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input id="email" type="text" />
      <input id="password" type="password" />
      <button type="submit"> login </button>
    </form>
  )
}

export default LoginPage
