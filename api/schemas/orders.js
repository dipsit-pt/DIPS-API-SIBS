// Imports --------------------------------------------
import { z } from 'zod';

// Definde headers
const headers = z.object({
  'content-type': z.literal('text/plain'),
  'content-length': z.string().optional(),
  accept: z.string().optional(),
  host: z.string().optional(),
});

// Define Body
const body = z.string();

export { headers, body };
