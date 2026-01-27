import { query as _query } from '../config/db.js'

export const getAllImages = async () => {
  const query = 'SELECT * FROM images'
  const result = await _query(query)
  return result.rows
}

export const getImageById = async (imageId) => {
  const query = 'SELECT * FROM images WHERE image_id = $1'
  const result = await _query(query, [imageId])
  return result.rows[0]
}

export const createImage = async (imageData) => {
  const query = `
        INSERT INTO images (filename, original_filename, file_path, content_type, file_size, uploaded_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `
  const values = [
    imageData.filename,
    imageData.original_filename,
    imageData.file_path,
    imageData.content_type,
    imageData.file_size,
    imageData.uploaded_by
  ]

  const result = await _query(query, values)
  return result.rows[0]
}

export const deleteImage = async (imageId) => {
  const query = 'DELETE FROM images WHERE image_id = $1'
  const result = await _query(query, [imageId])
  return result.rows[0]
}
