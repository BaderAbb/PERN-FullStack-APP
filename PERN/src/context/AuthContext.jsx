import { createContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Para mostrar un spinner mientras verificamos sesión

  // Efecto para verificar sesión al cargar la app
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const userData = await authService.getMe()
          setUser(userData)
        }
      } catch (error) {
        console.error('Sesión expirada o inválida')
        localStorage.removeItem('token') // Limpiamos token inválido
      } finally {
        setLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [])

  // Función de Login que usarán los componentes
  const login = async (email, password) => {
    const data = await authService.login({ email, password })
    setUser(data.user) // Actualizamos estado global
    return data
  }

  // Funcion de Registro
  const register = async userData => {
    const data = await authService.register(userData)
    setUser(data.user)
    return data
  }

  // Función de Logout
  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateUserAvatar = async file => {
    console.log('Subiendo imagen...', file)
    const updatedUser = await authService.uploadAvatar(file)
    setUser(updatedUser)
    return updatedUser
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, updateUserAvatar }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
