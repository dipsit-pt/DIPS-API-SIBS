// Imports --------------------------------------------
import { AppError } from '../utils/appError.js';
import { getEnvVars, postData } from '../utils/helper.js';

// Environment variables
const { SIBS_URL_TEST } = getEnvVars(['SIBS_URL_TEST']);

// Create checkout --------------------------------------------
export const createCheckoutModel = async (req, res) => {
  // Define options request
  const options = {
    url: `${SIBS_URL_TEST}/payments`,
    headers: req.headers,
    body: req.body,
  };

  //POST Data
  const data = await postData(options);

  return data;
};
