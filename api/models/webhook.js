// Imports --------------------------------------------
import { decryptMessage } from '../utils/crypto.js';
import { getEnvVars } from '../utils/helper.js';
import { AppError } from '../utils/appError.js';

// Environment variables
const { SIBS_SECRET_KEY_TEST } = getEnvVars(['SIBS_SECRET_KEY_TEST']);

const secretKey = SIBS_SECRET_KEY_TEST;

// Webhook Model --------------------------------------------
export const webhookModel = async (req, res) => {
  // Get Data from Request
  const message = req.body;
  const authTag = req.headers['x-authentication-tag'];
  const iv = req.headers['x-initialization-vector'];

  // Decrypt Message
  const data = JSON.parse(await decryptMessage(message, authTag, secretKey, iv));

  // Check if data success
  if (data.returnStatus.statusMsg != 'Success') {
    throw new AppError('ERR_INTERNAL_UNPROCESSABLE', 422);
  }

  // Define de return Object
  const returnData = {
    statusCode: 200,
    statusMsg: 'Success',
    notificationID: data.notificationID,
  };

  return returnData;
};
