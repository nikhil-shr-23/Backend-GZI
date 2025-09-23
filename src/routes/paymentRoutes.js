import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { createRazorpayOrder, verifyRazorpaySignature, razorpayWebhook } from '../controllers/paymentController.js';

const router = Router();

router.post('/razorpay/create-order', authenticate, createRazorpayOrder);
router.post('/razorpay/verify', authenticate, verifyRazorpaySignature);
router.post('/razorpay/webhook', razorpayWebhook);

export default router;


