// Imports --------------------------------------------
import { log } from '@dips/api-log';

// Reusable function to validate parts of the request --------------------------------------------

export const validatePart = (requestPart, schema, partName) => {
  // Validate the request part using the schema's safeParse method
  const validation = schema.safeParse(requestPart);

  // If validation fails, log the error and return a response object
  if (!validation.success) {
    // Log the specific part name (params, headers, or body)
    log(`Invalid ${partName}`, 'error');

    const errors =
      partName === 'body' || 'headers' || 'query' ? { errors: validation.error?.errors || [] } : {};

    // Return a consistent error response
    return {
      status: 400,
      message: `Invalid ${partName}`,
      // Only include errors for body
      details: { ...errors },
    };
  }
  // If validation succeeds, return null (no error)
  return {
    status: 200,
    message: 'success',
  };
};
