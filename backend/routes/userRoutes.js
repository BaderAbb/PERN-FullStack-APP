import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Definimos las rutas y las conectamos con los controladores
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); 

export default router;