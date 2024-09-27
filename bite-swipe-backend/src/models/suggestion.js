
module.exports = mongoose => {
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

  // Apply the plugin to the schema
  SuggestionSchema.plugin(AutoIncrement, { inc_field: 'sequenceIndex', start_seq: 3 }); // Start at 3 because we have 2 seeded suggestions

  // Function to create the model
  // const createSuggestionModel = (connection) => {
  //   return connection.model('suggestion', SuggestionSchema);
  // };
  return SuggestionSchema
};