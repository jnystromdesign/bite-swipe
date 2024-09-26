//TODO: Remove
const SuggesionService = require('../services/voteService');

async function vote(req, res) {
  try {
    const { id } = req.params;
    const { points } = req.body;

    const suggestion = await SuggesionService.vote(id, points)

    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    res.json(suggestion);
  } catch (error) {
    next(error);
  }
}
module.exports = { vote }


