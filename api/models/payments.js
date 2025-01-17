// Imports --------------------------------------------
import { AppError } from '../utils/appError.js';
import { getEnvVars, postData } from '../utils/helper.js';

// Environment variables
const { SIBS_URL } = getEnvVars(['SIBS_URL']);

// Create checkout --------------------------------------------
export const createCheckoutModel = async (req, res) => {
  let { headers } = req;

  console.log(headers);
  // Define options request
  const options = {
    url: `${SIBS_URL}/payments`,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: req.body,
  };

  //POST Data
  const data = await postData(options);

  return data;
};
