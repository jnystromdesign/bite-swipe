const express = require('express');
const { validateVote } = require('../validation/voteSchema');

/**
 * Creates and configures the vote routes.
 * 
 * @param {import('../core/serviceRegistry')} serviceRegistry - The service registry instance.
 * @returns {import('express').Router} The configured Express router for vote routes.
 * 
 * @example
 * const serviceRegistry = require('../core/serviceRegistry');
 * const voteRoutes = require('./voteRoutes')(serviceRegistry);
 * app.use('/vote', voteRoutes);
 */
module.exports = serviceRegistry => {
    const router = express.Router();
    const voteService = serviceRegistry.get('voteService');

    /**
     * POST /vote/:id
     * Registers a vote for a suggestion.
     * 
     * @param {string} req.params.id - The ID of the suggestion to vote for.
     * @param {number} req.body.points - The number of points to vote.
     */
    router.post('/vote/:id', validateVote, async (req, res, next) => {
        try {
            const { id } = req.params;
            const { points } = req.body;

            const suggestion = await voteService.vote(id, points)

            if (!suggestion) {
                return res.status(404).json({ message: 'Suggestion not found' });
            }

            res.json(suggestion);
        } catch (error) {
            next(error);
        }
    });

    return router;
};