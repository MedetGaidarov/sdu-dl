import React from 'react'

const AuthContext = React.createContext({
  token: null,
  setToken: () => {},
})
export function useAuth() {
  return React.useContext(AuthContext)
}

export default AuthContext
