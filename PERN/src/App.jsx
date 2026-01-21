import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App