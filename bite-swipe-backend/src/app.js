const express = require('express');
const container = require('./core/ioc');
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

  // Register services in the container
  container.register('suggestionService', suggestionService);
  container.register('voteService', voteService);

  app.use(helmet());
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
  // Allow images
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });

  app.use(express.json());

  app.use('/static', express.static(path.join(__dirname, '../public'), { maxAge: '1d' }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads'), { maxAge: '1d' }));

  // Pass models to routes
  app.use('/suggestions', suggestionRoutes(container));
  app.use('/vote', voteRoutes(container));

  app.use(errorHandler);

  return app;
};