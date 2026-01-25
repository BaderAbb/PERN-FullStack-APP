import { getAllImages } from '../models/imageModel.js'

// @desc    Obtener todas las imágenes
// @route   GET /api/images
export const getAllImagesController = async (req, res) => {
  try {
    const images = await getAllImages()
    res.status(200).json(images)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener imágenes' })
  }
}
