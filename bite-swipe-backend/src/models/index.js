

const initializeModels = (connection) => {
  const SuggestionSchema = require('./suggestion')(connection);
  // If the model is already defined, return it
  if (connection.models.Suggestion) {
    return {
      Suggestion: connection.models.Suggestion
    };
  }

  // Otherwise, create the model
  const Suggestion = connection.model('suggestion', SuggestionSchema);

  return { Suggestion };
};

module.exports = initializeModels;