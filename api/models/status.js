// Imports --------------------------------------------
import { getEnvVars, getData } from '../utils/helper.js';

// Environment variables
const { SIBS_URL } = getEnvVars(['SIBS_URL']);

// Get Transaction Status --------------------------------------------
export const getTransactionStatus = async (req, res) => {
  // Get data
  const { transactionID } = req.params;
  const { authorization } = req.headers;

  // Define options request
  const options = {
    url: `${SIBS_URL}/payments/${transactionID}/status`,
    headers: {
      Authorization: authorization,
      'X-IBM-Client-Id': req.headers['x-ibm-client-id'],
      accept: 'application/json',
    },
  };

  //POST Data
  const data = await getData(options);

  return data;
};
