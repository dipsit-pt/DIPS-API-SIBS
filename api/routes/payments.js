// Imports --------------------------------------------
import { validate } from '../middlewares/payments.js';
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
router.post('/mbway', validate, createMBWay);

// Reference Generate
router.post('/reference', validate, createReference);

export default router;
