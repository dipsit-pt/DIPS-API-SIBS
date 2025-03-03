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
const params = z
  .object({
    transactionID: z.string(),
  })
  .strict();

// Object endpoints schemas --------------------------------------------
export const endpoints = {
  purchase: {
    method: 'POST',
    hasHeaders: headers,
    hasBody: z
      .object({
        cardInfo: z.object({
          PAN: z.string().regex(/^\d{16}$/, { message: 'PAN must be a 16-digit number' }),
          secureCode: z.string().regex(/^\d{3}$/, { message: 'Secure Code must be a 3-digit number' }),
          validationDate: z.string().datetime({ message: 'Invalid date-time format' }),
          cardholderName: z.string(),
          createToken: z.boolean(),
        }),
      })
      .strict(),
    hasParams: params,
  },
};
