/// <reference path="../types/index.js" />

const express = require('express');
const { uploadFileFromFormField } = require('../utils/fileUpload');
const { validateSuggestion } = require('../validation/suggestionSchema');

/**
 * Creates and configures the suggestion routes.
 * 
 * @param {ServiceRegistry} serviceRegistry - The service registry instance.
 * @returns {ExpressRouter} The configured Express router for suggestion routes.
 */
module.exports = serviceRegistry => {
    const router = express.Router();
    /** @type {SuggestionService} */
    const suggestionService = serviceRegistry.get('suggestionService');

    /**
     * GET /suggestions
     * Retrieves all suggestions.
     * 
     * @async
     * @function
     * @name getAllSuggestions
     * @returns {Promise<Suggestion[]>} A promise that resolves to an array of suggestion objects.
     * @throws {Error} If there's an error fetching the suggestions.
     */
    router.get('/', async (req, res, next) => {
        try {
            const suggestions = await suggestionService.getAllSuggestions();
            res.json(suggestions);
        } catch (error) {
            next(error);
        }
    });

    /**
     * POST /suggestions
     * Creates a new suggestion.
     * 
     * @async
     * @function
     * @name createSuggestion
     * @param {Object} req.validatedData - The validated suggestion data.
     * @param {Object} req.file - The uploaded file information.
     * @returns {Promise<Object>} A promise that resolves to the created suggestion object.
     * @throws {Error} If there's an error creating the suggestion.
     */
    router.post('/',
        uploadFileFromFormField('file'),
        validateSuggestion,
        async (req, res, next) => {
            try {
                const suggestion = await suggestionService.createSuggestion(req.validatedData, req.file);
                res.status(201).json(suggestion);
            } catch (error) {
                next(error);
            }
        }
    );
    return router
}

