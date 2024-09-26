const { mongoose } = require('./db');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define Suggestion Schema
const SuggestionSchema = new mongoose.Schema({
  sequenceIndex: {
    type: Number,
    unique: true
  },
  name: String,
  address: String,
  image: String,
  votes: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

SuggestionSchema.plugin(AutoIncrement, {inc_field: 'sequenceIndex'});
const SuggestionModel = mongoose.model('suggestions', SuggestionSchema);


exports.SuggestionModel = SuggestionModel;
