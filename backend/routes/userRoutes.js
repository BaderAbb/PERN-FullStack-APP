import { Router } from 'express';
import { registerUser, loginUser, getMe, getAllUsers, uploadAvatar } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
const router = Router();

// Definimos las rutas y las conectamos con los controladores
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); 
router.get('/', getAllUsers);
router.post('/upload', protect, upload.single('image'), uploadAvatar);

export default router;