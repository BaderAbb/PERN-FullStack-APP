import Hero from '../components/Hero'
import Navbar from '../components/layout/navbar/Navbar'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar Simple */}
      <Navbar />

      {/* Contenido Principal */}
      <main className=''>
          {user ? (
            <div className='max-w-7xl mx-auto py-12 sm:px-10 lg:px-12 space-y-6'>
              {/* Sección de Bienvenida / Stats */}
              <div className='bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200'>
                <p className='text-2xl font-semibold text-gray-900'>
                  {user.email}
                </p>
              </div>

              {/* Placeholder para Feed de Posts */}
              <div className='border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center'>
                <p className='text-gray-400 text-lg'>
                  Aquí irán los posts de coches próximamente...
                </p>
              </div>
            </div>
          ) : (
            // Vista para usuarios no logueados (Landing simple)

            <Hero />
          )}
      </main>
    </div>
  )
}

export default Home
