import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
      return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Simple */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">CarSocial 🏎️</span>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 text-sm font-medium">Hola, {user.username}</span>
                  <button
                    onClick={logout}
                    className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition-colors">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {user ? (
            <div className="space-y-6">
               {/* Sección de Bienvenida / Stats */}
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Tu Panel de Control
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Detalles e información personal.
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-indigo-600">Email registrado</p>
                          <p className="text-2xl font-semibold text-gray-900">{user.email}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-green-600">ID de Usuario</p>
                          <p className="text-xs font-mono text-gray-900 mt-1">{user.user_id}</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Placeholder para Feed de Posts */}
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                 <p className="text-gray-400 text-lg">Aquí irán los posts de coches próximamente...</p>
              </div>

            </div>
          ) : (
            // Vista para usuarios no logueados (Landing simple)
            <div className="text-center mt-20">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                La red social para <span className="text-indigo-600">amantes del motor</span>
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Comparte tu coche, descubre modificaciones y conecta con otros entusiastas.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Empezar ahora
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Home;