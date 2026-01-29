import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/navbar/Navbar'
import AvatarSelector from '../components/common/AvatarSelector'
import CreatePostForm from '../components/posts/CreatePostForm'
import usePosts from '../hooks/usePosts'
import PostCard from '../components/posts/PostCard'

const Home = () => {
  const { user, logout, loading } = useAuth()
  const { posts, getMyPosts } = usePosts()

  useEffect(() => {
    getMyPosts()
  }, [])

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
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          {user ? (
            <div className='space-y-6 pt-10'>
              {/* Sección de Bienvenida / Stats */}
              <div className='bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Tu Panel de Control
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Detalles e información personal.
                  </p>
                </div>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    {/* Avatar */}
                    <div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
                      <div>
                        <h3 className='text-lg leading-6 font-medium text-gray-900'>
                          Tu Perfil
                        </h3>
                        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                          Gestiona tu identidad visual.
                        </p>
                      </div>
                      {/* Aquí integramos el componente */}
                      <AvatarSelector />
                    </div>
                    {/* Biografia */}
                    <div className='bg-blue-50 p-4 rounded-lg'>
                      <p className='text-sm font-medium text-blue-600'>
                        Biografia
                      </p>
                      <p className='text-2xl font-semibold text-gray-900'>
                        {user.bio}
                      </p>
                    </div>
                    {/* Email */}
                    <div className='bg-indigo-50 p-4 rounded-lg'>
                      <p className='text-sm font-medium text-indigo-600'>
                        Email registrado
                      </p>
                      <p className='text-2xl font-semibold text-gray-900'>
                        {user.email}
                      </p>
                    </div>
                    {/* Username */}
                    <div className='bg-green-50 p-4 rounded-lg'>
                      <p className='text-sm font-medium text-green-600'>
                        Nombre de usuario
                      </p>
                      <p className='text-2xl font-semibold text-gray-900'>
                        {user.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Create Post Form */}
              <CreatePostForm />

              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Últimas Publicaciones
              </h3>

              {/* Lógica de Renderizado del Feed */}

              {/* A. Si está cargando, mostramos un Spinner */}
              {loading && (
                <div className='flex justify-center py-10'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
                </div>
              )}

              {/* B. Si no carga y hay posts, los mostramos */}
              {!loading && posts.length > 0 ? (
                <div className='space-y-6'>
                  {posts.map(post => (
                    <PostCard key={post.post_id} post={post} />
                  ))}
                </div>
              ) : null}

              {/* C. Si no carga y NO hay posts (Array vacío) */}
              {!loading && posts.length === 0 && (
                <div className='text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                  <p className='text-gray-500 text-lg'>
                    Aún no hay publicaciones.
                  </p>
                  <p className='text-gray-400'>
                    ¡Sé el primero en presumir tu coche!
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Vista para usuarios no logueados (Landing simple)
            <div className='text-center mt-20'>
              <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
                La red social para{' '}
                <span className='text-indigo-600'>amantes del motor</span>
              </h1>
              <p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
                Comparte tu coche, descubre modificaciones y conecta con otros
                entusiastas.
              </p>
              <div className='mt-8 flex justify-center'>
                <div className='inline-flex rounded-md shadow'>
                  <Link
                    to='/register'
                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Empezar ahora
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
