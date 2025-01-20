// Imports --------------------------------------------
import { webhookModel } from '../models/webhook.js';
import { catchAsync } from '../utils/catchAsync.js';

// Webhook --------------------------------------------
export const webhook = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await webhookModel(req);

  // Send Data
  res.json(data);
});
