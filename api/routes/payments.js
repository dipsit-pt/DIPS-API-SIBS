// Imports --------------------------------------------
import { Router } from 'express';
const router = Router();

// Controller ----------------------------------------
import { transactionStatus, createCheckout, createMBWay, createReference } from '../controllers/payments.js';

// Routes --------------------------------------------
// Get Status
router.get('/:transactionId/status', transactionStatus);

// Create Payment Checkout
router.post('/create', createCheckout);

// MBWay Create
router.post('/mbway', createMBWay);

// Reference Generate
router.post('/reference', createReference);

export default router;
