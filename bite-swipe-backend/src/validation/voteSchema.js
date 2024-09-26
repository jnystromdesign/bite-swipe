const { z } = require('zod');

const voteSchema = z.object({
  name: z.number(),
  address: z.number(),
});

exports.validateVote = (req, res, next) => {
  try {
    const jsonData = JSON.parse(req.body.json);
    voteSchema.parse(jsonData);
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