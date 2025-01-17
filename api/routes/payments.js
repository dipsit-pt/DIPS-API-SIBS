// Imports --------------------------------------------
import { validate } from '../middlewares/checkout.js';
import { Router } from 'express';
const router = Router();

// Controller ----------------------------------------
import { transactionStatus, createCheckout, createMBWay, createReference } from '../controllers/payments.js';

// Routes --------------------------------------------
// Get Status
router.get('/:transactionId/status', transactionStatus);

// Create Payment Checkout
router.post('/create', validate, createCheckout);

// MBWay Create
router.post('/:transactionId/mbway/purchase', createMBWay);

// Reference Generate
router.post('/:transactionId/reference/generate', createReference);

export default router;
