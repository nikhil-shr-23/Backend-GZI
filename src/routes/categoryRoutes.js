import { Router } from 'express';
import { createCategory, listCategories, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', listCategories);
router.get('/:id', getCategory);

// Admin-protected in future; for now authenticate as placeholder
router.post('/', authenticate, createCategory);
router.put('/:id', authenticate, updateCategory);
router.delete('/:id', authenticate, deleteCategory);

export default router;


