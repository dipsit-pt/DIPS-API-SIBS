import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'SERVER-API-VAT' });
});

// Router --------------------------------------------
import paymentsRouter from './api/routes/payments.js';
import webhookRouter from './api/routes/webhook.js';

// Routes --------------------------------------------
// Payments
router.use('/payments', paymentsRouter);

// Webhook
router.use('/webhook', webhookRouter);

export { router as rSIBS };


