// Imports --------------------------------------------
import { endpoints } from '../schemas/reference.js';
import { validatePart } from '../utils/validateReq.js';
import { AppError } from '../utils/appError.js';

// Validate Request --------------------------------------------
export const validateReference = (req, res, next) => {
  const option = req.url.split('/').pop().toLowerCase();

  // Extract vars from req
  const { headers, params } = req;

  // Exists then get the variables from endpoints object (Zod)
  const { hasHeaders, hasParams } = endpoints[option];

  // Validate Params
  const paramError = validateAndHandle(params, hasParams, 'params');
  if (paramError) return next(paramError);

  // Validate Headers
  const headerError = validateAndHandle(headers, hasHeaders, 'headers');
  if (headerError) return next(headerError);

  next();
};

// Helper function for validation requests --------------------------------------------
const validateAndHandle = (part, hasPart, partName) => {
  const validation = validatePart(part, hasPart, partName);
  if (validation.status !== 200) {
    return new AppError(validation.message, validation.status, validation.details);
  }
};
