// Imports --------------------------------------------
import { validateCheckout } from '../middlewares/checkout.js';
import { validateMbway } from '../middlewares/mbway.js';
import { validateReference } from '../middlewares/reference.js';
import { validateStatus } from '../middlewares/status.js';
import { validateCard } from '../middlewares/card.js';
import { Router } from 'express';
const router = Router();

// Controller ----------------------------------------
import {
  transactionStatus,
  createCheckout,
  createMBWay,
  createReference,
  createCard,
} from '../controllers/payments.js';

// Routes --------------------------------------------
// Get Status
router.get('/:transactionID/status', validateStatus, transactionStatus);

// Create Payment Checkout
router.post('/create', validateCheckout, createCheckout);

// MBWay Create
router.post('/:transactionID/mbway/purchase', validateMbway, createMBWay);

// Reference Generate
router.post('/:transactionID/reference/generate', validateReference, createReference);

// Card Create
router.post('/:transactionID/card/purchase', validateCard, createCard);

export default router;
