// Imports --------------------------------------------
import { z } from 'zod';

// Definde headers
const headers = z.object({
  'content-type': z.literal('application/json').optional(),
  'content-length': z.string().optional(),
  'x-ibm-client-id': z.string(),
  authorization: z.string().refine((val) => val.startsWith('Digest '), {
    message: 'Needs an Authorization token',
  }),
  accept: z.literal('application/json').optional(),
  host: z.string().optional(),
});

// Define params
const params = z.object({
  transactionID: z.string(),
});

// Object endpoints schemas --------------------------------------------
export const endpoints = {
  generate: {
    method: 'POST',
    hasHeaders: headers,
    hasParams: params,
  },
};
