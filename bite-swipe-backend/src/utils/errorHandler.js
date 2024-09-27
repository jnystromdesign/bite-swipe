const { ZodError } = require('zod');
const { ErrorResponse, ValidationErrorDetail } = require('../types');

/**
 * Global error handler middleware for Express applications.
 * 
 * @param {Error} err - The error object caught by Express.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {void}
 * 
 * @throws {ErrorResponse} Sends an appropriate error response based on the error type.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message
      }))
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }))
    });
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ error: 'Malformatted id' });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default to 500 server error
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;