const mongoose = require('mongoose');
const config = require('./src/config');
const initializeModels = require('./src/models');

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    const models = initializeModels(mongoose);
    const app = require('./src/app')(models);
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

// Error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});