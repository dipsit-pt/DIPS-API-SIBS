// Imports --------------------------------------------
import { Router } from 'express';
const router = Router();

// Controller ----------------------------------------
import { getAllTransactions, createOrder } from '../controllers/order.js';

// Routes --------------------------------------------
// Get Transactions
router.get('/getall', getAllTransactions);

// Create Order
router.post('/create', createOrder);

// Update Order
router.patch('/update');

// Update Payment - payment process SIBS, eg: checkout, etc
router.patch('/payment');

// Complete - marks the transaction complete
router.patch('/complete');

export default router;
