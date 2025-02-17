// Imports --------------------------------------------
import { getEnvVars, postData } from '../utils/helper.js';

// Environment variables
const { SIBS_URL } = getEnvVars(['SIBS_URL']);

// Create Card --------------------------------------------
export const createCardModel = async (req, res) => {
  // Get data
  const { transactionID } = req.params;
  const { authorization } = req.headers;

  // Define options request
  const options = {
    url: `${SIBS_URL}/payments/${transactionID}/card/purchase`,
    headers: {
      Authorization: authorization,
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
