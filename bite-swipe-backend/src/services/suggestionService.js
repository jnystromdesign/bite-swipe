const config = require('../config');

class SuggestionService {
  constructor(SuggestionModel) {
    this.SuggestionModel = SuggestionModel;
  }

  async getAllSuggestions() {
    return await this.SuggestionModel.find();
  }

  async createSuggestion(data, file) {
    const { name, address } = data;
    const fileURI = `${config.apiUrl}/uploads/${file.filename}`;
    const newSuggestion = new this.SuggestionModel({ name, address, image: fileURI });
    console.log(newSuggestion)
    return newSuggestion.save();
  }

  // Add other methods as needed...
}

module.exports = SuggestionService;