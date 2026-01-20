import React from 'react'
import Car from './components/Car'

const App = () => {
  return (
    <div className='text-3xl font-bold text-red-950'>
      <h1>Welcome to the car store</h1>
      <ul>
        <Car />
        <Car />
        <Car />
      </ul>
    </div>
  )
}

export default App
