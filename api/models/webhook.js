// Imports --------------------------------------------
import { decryptMessage } from '../utils/crypto.js';
import { getEnvVars, postData } from '../utils/helper.js';
import { AppError } from '../utils/appError.js';
import { log } from '@dips/api-log';

// Environment variables
const { SIBS_API_URL, SIBS_API_TOKEN } = getEnvVars(['SIBS_API_URL, SIBS_API_TOKEN']);

// Webhook Model --------------------------------------------
export const webhookModel = async (req, res) => {
  // Get Data from Request
  const message = req.body;
  const authTag = req.headers['x-authentication-tag'];
  const iv = req.headers['x-initialization-vector'];
  const secretKey = req.headers['x-secret-key'];
  let dataParsed;

  // Decrypt Message
  //const data = JSON.parse(await decryptMessage(message, authTag, secretKey, iv));
  const data = await decryptMessage(message, authTag, secretKey, iv);

  if (!data) {
    log('ERR_INTERNAL_EMPTY', 'error');
    throw new AppError('ERR_INTERNAL_EMPTY', 422);
  }

  // Check if data is json
  try {
    dataParsed = JSON.parse(data);
  } catch (error) {
    log(JSON.stringify(dataParsed, null, 2), 'error');
    throw new AppError('ERR_INTERNAL_UNPROCESSABLE', 422);
  }

  if (dataParsed.returnStatus.statusMsg != 'Success') {
    // Check if data success
    log(JSON.stringify(dataParsed, null, 2), 'error');
    throw new AppError('ERR_INTERNAL_UNPROCESSABLE', 422, dataParsed);
  }

  // Success
  log(JSON.stringify(dataParsed, null, 2), 'info');

  // Prepare POST
  // const options = {
  //   url: SIBS_API_URL,
  //   headers: {
  //     authorization: `Bearer ${SIBS_API_TOKEN}`,
  //   },
  //   body: data,
  // };

  // POST DATA
  // const post = await postData(options);
  // log(`TransactionId: ${data.transactionID}`, 'info');

  // Define de return Object
  const returnData = {
    statusCode: 200,
    statusMsg: 'Success',
    notificationID: dataParsed.notificationID,
  };

  return returnData;
};
