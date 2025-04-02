// Imports --------------------------------------------
import { postData, getData, getEnvVars } from '../utils/helper.js';
import { decryptWebookMessage, decryptMessage } from '../utils/crypto.js';
import { AppError } from '../utils/appError.js';
import { log } from '@dips/api-log';
import { json } from 'express';

// Environment variables
const { SIBS_SECRET_KEY, SIBS_AUTH_TAG, SIBS_INIT_VALUE } = getEnvVars(['SIBS_SECRET_KEY', 'SIBS_AUTH_TAG', 'SIBS_INIT_VALUE']);

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

// Webhook Model --------------------------------------------
export const webhookModel = async (req, res) => {
  let directusBody = {};

  try {
    // Get Data from Request
    const message = req.body;
    const authTag = req.headers['x-authentication-tag'];
    const iv = req.headers['x-initialization-vector'];
    const secretKey = SIBS_SECRET_KEY;
    let dataParsed;
    let result;

    // Decrypt Message
    const data = await decryptMessage(message, authTag, secretKey, iv);

    // Check Data
    if (!data) {
      log('ERR_INTERNAL_EMPTY', 'error');
      throw new AppError('ERR_INTERNAL_EMPTY', 422);
    }

    // Check if data is json
    try {
      dataParsed = JSON.parse(data);
      directusBody = dataParsed;
    } catch (error) {
      log(JSON.stringify(dataParsed, null, 2), 'error');
      throw new AppError('ERR_INTERNAL_PARSE', 422);
    }

    // Success
    log(JSON.stringify(dataParsed, null, 2), 'info');

    // Define de return Object
    const returnData = {
      statusCode: 200,
      statusMsg: 'Success',
      notificationID: dataParsed.notificationID,
    };

    return returnData;
  } catch (err) {
    console.error('Decryption error:', err.message);
    directusBody = err.message;
    throw new AppError(err.message, 500);
  } finally {
    // Prepare POST
    const options = {
      url: 'https://directus.dips.pt/flows/trigger/224f3d6f-d559-4e07-b2b0-5d21bc66d815',
      headers: {
        'content-type': `application/json`,
      },
      body: directusBody,
    };

    // POST DATA
    const post = await postData(options);
    console.log(post);
  }
};

// Update Order --------------------------------------------
export const updateOrderModel = async (req, res) => {
  const { body } = req;

  // Extract Id and Orders
  const { id, orders } = body;

  // Define options request
  const options = {
    url: `${DIRECTUS_URL}/items/Transactions`,
  };

  //Get Data Data
  //const data = await postData(options);

  return 'success'; // data;
};
