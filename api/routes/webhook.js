// Imports --------------------------------------------
import { Router } from 'express';
import { validateWebhook } from '../middlewares/webhook.js';
const router = Router();

// Controller ----------------------------------------
import { webhook } from '../controllers/webhook.js';

// Routes --------------------------------------------
router.post('/', validateWebhook, webhook);

export default router;
