// Imports --------------------------------------------
import { createCheckoutModel } from '../models/payments.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

// Get Transaction Status --------------------------------------------
export const transactionStatus = (req, res, next) => {
  res.status(200).json({
    status: 'Success - transactions controller',
  });
};

// Create Checkout --------------------------------------------
export const createCheckout = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await createCheckoutModel(req);

  // Send Data
  res.json({ data });
});

// Create MBWay --------------------------------------------
export const createMBWay = (req, res, next) => {
  res.status(200).json({
    status: 'Success - transactions controller',
  });
};

// Create Reference --------------------------------------------
export const createReference = (req, res, next) => {
  res.status(200).json({
    status: 'Success - transactions controller',
  });
};
