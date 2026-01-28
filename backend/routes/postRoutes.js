import { Router } from 'express'
import { createNewPost, getFeed } from '../controllers/postController.js'
import { upload } from '../middleware/upload.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// Ruta protegida para crear post (acepta imagen)
router.post('/', protect, upload.single('image'), createNewPost)

// Ruta pública para obtener feed
router.get('/', getFeed)

export default router
