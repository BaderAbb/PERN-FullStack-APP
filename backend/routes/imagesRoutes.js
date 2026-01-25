import { Router } from 'express';
import { getAllImagesController } from '../controllers/imagesController.js';

const router = Router();

router.get('/', getAllImagesController);

export default router;
