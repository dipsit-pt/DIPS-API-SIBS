// Imports --------------------------------------------
import { AppError } from '../utils/appError.js';
import { getEnvVars, postData } from '../utils/helper.js';

// Environment variables
const { SIBS_URL } = getEnvVars(['SIBS_URL']);

// Create checkout --------------------------------------------
export const createCheckoutModel = async (req, res) => {
  // Define options request
  const options = {
    url: `${SIBS_URL}/payments`,
    headers: {
      Authorization: req.headers.authorization,
      'X-IBM-Client-Id': req.headers['x-ibm-client-id'],
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: req.body,
  };

  //POST Data
  const data = await postData(options);

  return data;
};
