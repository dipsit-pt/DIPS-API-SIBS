// Imports --------------------------------------------
import { decryptMessage } from '../utils/crypto.js';
import { getEnvVars, postData } from '../utils/helper.js';
import { AppError } from '../utils/appError.js';
import { log } from '@dips/api-log';

// Environment variables
const { SIBS_SECRET_KEY, SIBS_AUTH_TAG, SIBS_INIT_VALUE } = getEnvVars(['SIBS_SECRET_KEY', 'SIBS_AUTH_TAG', 'SIBS_INIT_VALUE']);

// Webhook Model --------------------------------------------
export const webhookModel = async (req, res) => {
  // Get Data from Request
  const message = req.body;
  const authTag = SIBS_AUTH_TAG;
  const iv = SIBS_INIT_VALUE;
  const secretKey = SIBS_SECRET_KEY;
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
  const options = {
    url: 'https://directus.dips.pt/flows/trigger/224f3d6f-d559-4e07-b2b0-5d21bc66d815',
    headers: {
      'content-type': `application/json`,
    },
    body: dataParsed,
  };

  // POST DATA
  const post = await postData(options);
  console.log(post);
  //log(`TransactionId: ${data.transactionID}`, 'info');

  // Define de return Object
  const returnData = {
    statusCode: 200,
    statusMsg: 'Success',
    notificationID: dataParsed.notificationID,
  };

  return returnData;
};
