// Imports --------------------------------------------
import { postData, getData, getEnvVars } from '../utils/helper.js';

// Environment variables
const DIRECTUS_URL = process.env.DIRECTUS_URL;

// Get All Transaction --------------------------------------------
export const getAllTransactionsModel = async (req, res) => {
  // Define options request
  const options = {
    url: `${DIRECTUS_URL}/items/Transactions`,
  };

  //Get Data Data
  const data = await getData(options);

  return data;
};

// Create Order - UUID --------------------------------------------
export const createOrderModel = async (req, res) => {
  // Define options request
  const options = {
    url: `${DIRECTUS_URL}/items/Transactions`,
  };

  //Get Data Data
  const data = await postData(options);

  return data;
};
