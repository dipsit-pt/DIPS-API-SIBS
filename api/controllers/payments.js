// Imports --------------------------------------------
import { createMbwayModel } from '../models/mbway.js';
import { createCheckoutModel } from '../models/payments.js';
import { createReferenceModel } from '../models/reference.js';
import { getTransactionStatus } from '../models/status.js';
import { catchAsync } from '../utils/catchAsync.js';

// Get Transaction Status --------------------------------------------
export const transactionStatus = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await getTransactionStatus(req);

  // Send Data
  res.json({ data });
});

// Create Checkout --------------------------------------------
export const createCheckout = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await createCheckoutModel(req);

  // Send Data
  res.json({ data });
});

// Create MBWay --------------------------------------------
export const createMBWay = catchAsync(async (req, res, next) => {
  // Call Model Function
  const data = await createMbwayModel(req);

  // Send Data
  res.json({ data });
});

// Create Reference --------------------------------------------
export const createReference = catchAsync(async (req, res, next) => {
  // Call Model Function
  const data = await createReferenceModel(req);

  // Send Data
  res.json({ data });
});
