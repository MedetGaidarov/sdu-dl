import React, { useState } from 'react'
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null) // retrieve from local storage if you are persisting there

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
}
