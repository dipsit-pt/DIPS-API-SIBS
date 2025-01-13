// Requires --------------------------------------------
import { config } from 'dotenv';

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
  // Define Headers
  let headers = {
    'Content-Type': 'application/json',
  };

  // Check Headers
  if (options.hasOwnProperty('headers')) {
    // Iterate Headers
    Object.entries(options.headers).forEach(([key, value]) => {
      // Add Headers
      headers[key] = value;
    });
  }

  // Define Body
  let body;

  // Check Body
  if (options.hasOwnProperty('body')) {
    // Stringify Body
    body = JSON.stringify(options.body);
  }

  // Get Data Fetch
  const response = await fetch(options.url, {
    // *GET, POST, PUT, DELETE, etc.
    method: 'POST',

    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',

    headers: headers,
    body: body, // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}
