// Imports --------------------------------------------
import express from 'express';
const router = express.Router();

// Router --------------------------------------------
import paymentsRouter from './payments.js';
import webhookRouter from './webhook.js';
import ordersRouter from './orders.js';

// Routes --------------------------------------------

// Payments
router.use('/payments', paymentsRouter);

// Webhook
router.use('/webhook', webhookRouter);

// Orders - Directus
router.use('/orders', ordersRouter);

export default router;
