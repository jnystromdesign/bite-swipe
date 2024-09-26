const express = require('express');
const { uploadFileFromFormField } = require('../utils/fileUpload');
const { validateSuggestion } = require('../validation/suggestionSchema');


module.exports = container => {
    const router = express.Router();
    const suggestionService = container.get('suggestionService');

    router.get('/', async (req, res, next) => {
        try {
            const suggestions = await suggestionService.getAllSuggestions();
            res.json(suggestions);
        } catch (error) {
            next(error);
        }
    });

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

