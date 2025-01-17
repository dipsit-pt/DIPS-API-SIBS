// Imports --------------------------------------------
import { z } from 'zod';

// Definde headers
const headers = z
  .object({
    'content-type': z.literal('application/json').optional(),
    'content-length': z.string().optional(),
    'x-ibm-client-id': z.string(),
    authorization: z.string().refine((val) => val.startsWith('Digest '), {
      message: 'Needs an Authorization token',
    }),
    accept: z.literal('application/json').optional(),
    host: z.string().optional(),
  })
  .strict();

// Define params
const params = z.object({
  transactionID: z.string(),
});

// Object endpoints schemas --------------------------------------------
export const endpoints = {
  purchase: {
    method: 'POST',
    hasParams: params,
    hasHeaders: headers,
    hasBody: z
      .object({
        customerPhone: z
          .string()
          .regex(/^351#[0-9]{9}$/, { message: "CustomerPhone must match the pattern '351#[0-9]{9}'" }),
      })
      .strict(),
  },
};
