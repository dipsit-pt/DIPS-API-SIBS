// Requires --------------------------------------------
import { config } from 'dotenv';
import { AppError } from './appError.js';

// Config
config();

// Functions --------------------------------------------

// Get Environment Variables --------------------------------------------
export const getEnvVars = (keys = []) => {
  //If type is diferent than Array
  if (!Array.isArray(keys)) {
    console.log(`Received type: ${typeof keys}`);
    throw new TypeError('Expected an array of keys');
  }

  // Using reduce method
  return keys.reduce((envVars, key) => {
    // Retrieve the environment variable value
    envVars[key] = process.env[key];
    return envVars;
  }, {}); // Start with an empty object
};

// POST Data Function --------------------------------------------
export async function postData(options) {
  const headers = options.headers || {};
  const body = options.body ? JSON.stringify(options.body) : undefined;

  const response = await fetch(options.url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
    body,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new AppError(`Request failed with status ${response.status}: ${response.statusText}`, response.status);
  }

  return await response.json();
}

// GET Data Function --------------------------------------------
export async function getData(options) {
  const headers = options.headers || {};

  const response = await fetch(options.url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
  });

  console.log(response);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new AppError(`Request failed with status ${response.status}: ${response.statusText}`, response.status);
  }

  return response.json();
}
