import { query as _query } from '../config/db.js'

// Crear un nuevo post
export const createPost = async ({
  user_id,
  car_make,
  car_model,
  car_year,
  title,
  description,
  image_id
}) => {
    console.log(user_id, car_make, car_model, car_year, title, description, image_id)
  const query = `
        INSERT INTO posts (user_id, car_make, car_model, car_year, title, description, image_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `
  const values = [user_id, car_make, car_model, car_year, title, description, image_id]
  const result = await _query(query, values)
  return result.rows[0]
}

// Obtener todos los posts de un usuario
export const getAllPostsFromUser = async user_id => {
  const query = `SELECT 
                    p.post_id, 
                    p.car_make, 
                    p.car_model, 
                    p.car_year, 
                    p.title, 
                    p.description, 
                    p.created_at,
                    u.username,
                    img_car.filename as post_image_file,
                    img_avatar.filename as author_avatar_file
                    FROM posts p
                    JOIN users u ON p.user_id = u.user_id
                    LEFT JOIN images img_car ON p.image_id = img_car.image_id
                    LEFT JOIN images img_avatar ON u.profile_picture_id = img_avatar.image_id
                    WHERE p.user_id = $1
                    ORDER BY p.created_at DESC;`
  const values = [user_id]
  const result = await _query(query, values)
  return result.rows
}

// Obtener todos los posts
export const getAllPosts = async () => {
  const query = `
    SELECT 
      p.post_id, p.car_make, p.car_model, p.car_year, p.title, p.description, p.created_at,
      u.username,
      img_car.filename as post_image_file,
      img_avatar.filename as author_avatar_file
    FROM posts p
    JOIN users u ON p.user_id = u.user_id
    LEFT JOIN images img_car ON p.image_id = img_car.image_id
    LEFT JOIN images img_avatar ON u.profile_picture_id = img_avatar.image_id
    ORDER BY p.created_at DESC;
  `
  const result = await _query(query)
  return result.rows
}
