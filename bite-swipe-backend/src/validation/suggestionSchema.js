const { z } = require('zod');

const suggestionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  address: z.string().min(1, 'Address is required').max(200, 'Address must be 200 characters or less'),
});

exports.validateSuggestion = (req, res, next) => {
  try {
    const jsonData = JSON.parse(req.body.json);
    suggestionSchema.parse(jsonData);
    req.validatedData = jsonData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    next(error);
  }
};