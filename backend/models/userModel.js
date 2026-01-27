import { query as _query } from '../config/db.js'

// Obtenemos todos los usuarios
export const findAllUsers = async () => {
  const query = `SELECT * FROM users`
  const result = await _query(query)
  return result.rows
}

// Crear un nuevo usuario
export const createUser = async ({ username, email, passwordHash }) => {
  const query = `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id, username, email, created_at;
    `
  const values = [username, email, passwordHash]

  const result = await _query(query, values)
  return result.rows[0]
}

// Crear un nuevo usuario con bio
export const createUserWithBio = async ({
  username,
  email,
  passwordHash,
  bio
}) => {
  const query = `
        INSERT INTO users (username, email, password_hash, bio)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, username, email, created_at;
    `
  const values = [username, email, passwordHash, bio || null]

  const result = await _query(query, values)
  return result.rows[0]
}

// Buscar usuario por Email (útil para el Login y evitar duplicados)
export const findUserByEmail = async email => {
  const query = `SELECT u.*, i.filename as profile_picture_url
                  FROM users u
                  LEFT JOIN images i ON u.profile_picture_id = i.image_id
                  WHERE u.email = $1`
  const result = await _query(query, [email])

  //agregamos el URL del avatar para que se muestre la imagen al hacer login
  if (result.rows[0]) {
    const user = result.rows[0]
    if (user.profile_picture_url) {
      user.profile_picture_url =
        'http://localhost:5000/uploads/' + user.profile_picture_url
    }
    return user
  }

  return null
}

// Buscar usuario por Username (para evitar duplicados o perfiles)
export const findUserByUsername = async username => {
  const query = `SELECT * FROM users WHERE username = $1`
  const result = await _query(query, [username])
  return result.rows[0]
}

// Buscar usuario por ID (útil para rutas protegidas o perfil)
export const findUserById = async id => {
  // Excluimos el password_hash por seguridad en esta consulta
  const query = `
        SELECT u.user_id, u.username, u.email, u.bio, u.profile_picture_id, u.created_at, i.filename as profile_picture_url
        FROM users u
        LEFT JOIN images i ON u.profile_picture_id = i.image_id
        WHERE u.user_id = $1;
    `
  const result = await _query(query, [id])

  // Si encontramos el usuario, agregamos la URL del avatar
  if (result.rows[0]) {
    const user = result.rows[0]
    if (user.profile_picture_url) {
      user.profile_picture_url = 'http://localhost:5000/uploads/' + user.profile_picture_url
    }
    return user
  }

  return null
}

// Actualizar avatar de usuario y eliminar la imagen anterior de la base de datos
export const updateUserAvatar = async (userId, imageId) => {
  const query = `
        UPDATE users 
        SET profile_picture_id = $1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
        RETURNING *;
    `
  const result = await _query(query, [imageId, userId])
  return result.rows[0]
}

export const updateBio = async (userId, bio) => {
  const query = `
        UPDATE users 
        SET bio = $1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
        RETURNING *;
    `
  const result = await _query(query, [bio, userId])
  return result.rows[0]
}
