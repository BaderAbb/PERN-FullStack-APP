import React from 'react'

const User = ({ user }) => {
  return (
    <li key={user.id}>
      <p>{user.username}</p>
    </li>
  )
}

export default User