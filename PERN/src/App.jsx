import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { PostProvider } from './context/PostContext'

function App () {
  return (
    <AuthProvider>
      <PostProvider>
      <div className='App'>
        {/* Aquí iría tu Navbar en el futuro */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      </PostProvider>
    </AuthProvider>
  )
}

export default App
