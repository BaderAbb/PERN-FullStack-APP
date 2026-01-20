import { useState, useEffect } from 'react'
import User from './components/User'

const App = () => {
  const [users, setusers] = useState([])

  useEffect(() => {
    fetch('api/users')
      .then(response => response.json())
      .then(data => setusers(data))
  }, [])

  console.log(users)

  return (
    <div>
      <h1>Users</h1>
      <ul className='list-disc'>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    </div>
  )
}

export default App
