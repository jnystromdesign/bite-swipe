const express = require('express');
const { validateVote } = require('../validation/voteSchema');

module.exports = container => {
    const router = express.Router();
    const voteService = container.get('voteService');


    router.post('/vote/:id', validateVote, async (req, res) => {
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

    return router
}
