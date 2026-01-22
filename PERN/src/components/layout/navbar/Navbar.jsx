import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const { user, logout } = useAuth()

  return (
    <nav className='bg-gray-900 fixed w-full top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className="shrink-0">
            <div className="flex items-center">
              <div className="bg-orange-500 px-3 py-1 rounded">
                <span className="text-white font-bold text-xl">CaRS</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className='ml-10 flex items-baseline space-x-8'>
            {user ? (
              <div className='flex items-center gap-4'>
                <span className='text-gray-700 text-sm font-medium'>
                  Hola, {user.username}
                </span>
                <button
                  onClick={logout}
                  className='bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors'
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <Link
                  to='/login'
                  className='text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200'
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to='/register'
                  className='bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition-colors'
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
