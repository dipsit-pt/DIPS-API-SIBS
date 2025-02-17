// Imports --------------------------------------------
import { endpoints } from '../schemas/checkout.js';
import { validatePart } from '../utils/validateReq.js';
import { AppError } from '../utils/appError.js';

// Validate Request --------------------------------------------
export const validateCheckout = (req, res, next) => {
  const option = req.url.split('/').pop().toLowerCase();

  // Extract vars from req
  const { body, headers } = req;

  // Exists then get the variables from endpoints object (Zod)
  const { hasHeaders, hasBody } = endpoints[option];

  // Validate Headers
  const headerError = validateAndHandle(headers, hasHeaders, 'headers');
  if (headerError) return next(headerError);

  // Validate Body
  if (hasBody) {
    const bodyError = validateAndHandle(body, hasBody, 'body');
    if (bodyError) return next(bodyError);
  }
  next();
};

// Helper function for validation requests --------------------------------------------
const validateAndHandle = (part, hasPart, partName) => {
  const validation = validatePart(part, hasPart, partName);
  if (validation.status !== 200) {
    return new AppError(validation.message, validation.status, validation.details);
  }
};
