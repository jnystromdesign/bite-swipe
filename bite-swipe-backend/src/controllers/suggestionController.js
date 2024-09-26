// TODO: Remove
const suggestionService = require('../services/suggestionService');

exports.getAllSuggestions = async (req, res, next) => {
  try {
    const suggestions = await suggestionService.getAllSuggestions();
    res.json(suggestions);
  } catch (error) {
    next(error);
  }
};

exports.createSuggestion = async (req, res, next) => {
  try {
    const suggestion = await suggestionService.createSuggestion(req.validatedData, req.file);
    res.status(201).json(suggestion);
  } catch (error) {
    next(error);
  }
};