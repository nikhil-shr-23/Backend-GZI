import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { createOrder, getMyOrders, getOrder } from '../controllers/orderController.js';

const router = Router();

router.use(authenticate);
router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrder);

export default router;


