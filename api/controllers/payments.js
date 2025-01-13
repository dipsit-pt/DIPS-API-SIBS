// Imports --------------------------------------------
import { catchAsync } from '../utils/catchAsync.js';

// Get Transaction Status --------------------------------------------
export const transactionStatus = (req, res, next) => {
  res.status(200).json({
    status: 'Success - transactions controller',
  });
};

// Create Checkout --------------------------------------------
export const createCheckout = (req, res, next) => {
  res.status(201).json({
    status: 'Success - transactions controller',
    body: req.body,
  });
};

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
