// Imports --------------------------------------------
import express from 'express';
const router = express.Router();

// Router --------------------------------------------
import paymentsRouter from './payments.js';

// Routes --------------------------------------------
// Payments
router.use('/payments', paymentsRouter);

export default router;
