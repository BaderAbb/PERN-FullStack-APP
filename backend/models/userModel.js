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
  const query = `SELECT * FROM users WHERE email = $1`
  const result = await _query(query, [email])
  return result.rows[0]
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
        SELECT user_id, username, email, bio, profile_picture_id, created_at 
        FROM users 
        WHERE user_id = $1
    `
  const result = await _query(query, [id])
  return result.rows[0]
}
