// Imports --------------------------------------------
import { catchAsync } from '../utils/catchAsync.js';
import { getAllTransactionsModel, createOrderModel } from '../models/order.js';

// Get All Transaction --------------------------------------------
export const getAllTransactions = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await getAllTransactionsModel(req);

  // Send Data
  res.json({ data });
});

// Create a new Order - UUID --------------------------------------------
export const createOrder = catchAsync(async (req, res, next) => {
  // Call the Model Function
  const data = await createOrderModel(req);

  // Send Data
  res.json({ data });
});
