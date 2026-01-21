import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'

function App () {
  return (
    <AuthProvider>
      <div className='App'>
        {/* Aquí iría tu Navbar en el futuro */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
