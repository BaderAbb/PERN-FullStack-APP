import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)

  const { register } = useAuth()
  const navigate = useNavigate()

  const { username, email, password, confirmPassword } = formData

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await register({ username, email, password })
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || 'Error al registrar usuario'
      setError(message)
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8'>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={onSubmit} className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={onChange} className='w-full p-2 border border-gray-300 rounded' />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={onChange} className='w-full p-2 border border-gray-300 rounded' />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={onChange} className='w-full p-2 border border-gray-300 rounded' />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} className='w-full p-2 border border-gray-300 rounded' />
        <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Register</button>
        <p>¿Ya tienes cuenta? <Link to="/login" className='text-blue-500 hover:text-blue-600'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register