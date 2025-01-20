// Imports --------------------------------------------
import { headers as hasHeaders, body as hasBody } from '../schemas/webhook.js';
import { validatePart } from '../utils/validateReq.js';
import { AppError } from '../utils/appError.js';

// Validate Request --------------------------------------------
export const validateWebhook = (req, res, next) => {
  // Extract vars from req
  const { body, headers } = req;

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
