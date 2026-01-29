import { Router } from 'express'
import { createNewPost, getFeed, getMyPosts } from '../controllers/postController.js'
import { upload } from '../middleware/upload.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// Ruta protegida para crear post (acepta imagen)
router.post('/', protect, upload.single('post_image'), createNewPost)

// Ruta protegida para obtener mis posts
router.get('/me', protect, getMyPosts)

// Ruta pública para obtener feed
router.get('/', getFeed)

export default router
