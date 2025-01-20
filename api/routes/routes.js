// Imports --------------------------------------------
import express from 'express';
const router = express.Router();

// Router --------------------------------------------
import paymentsRouter from './payments.js';
import webhookRouter from './webhook.js';

// Routes --------------------------------------------
// Payments
router.use('/payments', paymentsRouter);

// Webhook
router.use('/webhook', webhookRouter);

export default router;
