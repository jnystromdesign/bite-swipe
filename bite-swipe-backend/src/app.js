const express = require('express');
const serviceRegistry = require('./core/ioc');
const suggestionRoutes = require('./routes/suggestionRoutes');
const voteRoutes = require('./routes/voteRoutes');
const SuggestionService = require('./services/suggestionService');
const VoteService = require('./services/voteService');
const errorHandler = require('./utils/errorHandler');
const config = require('./config');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
var path = require('path');

module.exports = (models) => {
  const app = express();

  // Set up your services
  const suggestionService = new SuggestionService(models.Suggestion);
  const voteService = new VoteService(models.Suggestion);

  // Register services in the serviceRegistry
  serviceRegistry.register('suggestionService', suggestionService);
  serviceRegistry.register('voteService', voteService);

  app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

  app.use(express.json());

  app.use('/static', express.static(path.join(__dirname, '../public'), { maxAge: '1d' }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads'), { maxAge: '1d' }));

  // Pass models to routes
  app.use('/suggestions', suggestionRoutes(serviceRegistry));
  app.use('/vote', voteRoutes(serviceRegistry));

  app.use(errorHandler);

  return app;
};