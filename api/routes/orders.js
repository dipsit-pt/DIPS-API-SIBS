// Imports --------------------------------------------
import { Router } from 'express';
const router = Router();

// Midleware
import { validateWebhook } from '../middlewares/orders.js';

// Controller ----------------------------------------
import { getAllTransactions, createOrder, webhook } from '../controllers/orders.js';

// Routes --------------------------------------------
// Get Transactions
router.get('/getAll', getAllTransactions);

// Create Order
router.post('/create', createOrder);

// Update Order
router.patch('/update');

// Update Payment - payment process SIBS, eg: checkout, etc
router.patch('/payment');

// Complete - marks the transaction complete
router.patch('/complete');

// Webhook
router.post('/webhook', validateWebhook, webhook);

export default router;
