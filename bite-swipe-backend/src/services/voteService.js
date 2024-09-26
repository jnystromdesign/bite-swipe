class VoteService {
  constructor(SuggestionModel) {
    this.SuggestionModel = SuggestionModel;
  }

  async vote(id, points) {
    return SuggestionModel.findByIdAndUpdate(
      id,
      { $inc: { votes: 1, points: points } },
      { new: true }
    );
  }
}
module.exports = VoteService