import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../AuthProvider/AuthContext'

function ProtectedRoute({ element, ...rest }) {
  let { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  )
}

export default ProtectedRoute
