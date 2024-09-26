const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { uploadFileFromFormField } = require('./utils/fileUpload');
const { SuggestionModel } = require('./db/suggestion.model');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

// Logging middleware (consider using a proper logging library in production)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/static', express.static('public', { maxAge: '1d' }));
app.use('/uploads', express.static('uploads', { maxAge: '1d' }));

app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all suggestions
app.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await SuggestionModel.find();
    res.json(suggestions);
  } catch (error) {
    console.error('Error in GET /suggestions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new suggestion
app.post('/suggestions', uploadFileFromFormField('file'), async (req, res) => {
  try {
    const jsonData = JSON.parse(req.body.json);
    const file = req.file;
    const fileURI = `${process.env.API_URL}/uploads/`;
    const { name, address } = jsonData;

    // Basic input validation
    if (!name || !address) {
      return res.status(400).json({ error: 'Name and address are required' });
    }

    const newSuggestion = new SuggestionModel({ name, address, image: fileURI + file.filename });
    await newSuggestion.save();
    
    res.status(201).json({ newSuggestion });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

// Vote for a suggestion
app.post('/vote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    // Input validation
    if (!points || typeof points !== 'number') {
      return res.status(400).json({ error: 'Valid points are required' });
    }

    const suggestion = await SuggestionModel.findByIdAndUpdate(
      id,
      { $inc: { votes: 1, points: points } },
      { new: true }
    );

    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    res.json(suggestion);
  } catch (error) {
    console.error(`Error in POST /vote/${req.params.id}:`, error);
    res.status(400).json({ message: 'Invalid request' });
  }
});

// Get voting results
app.get('/results', async (req, res) => {
  try {
    const results = await SuggestionModel.find().sort({ points: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error in GET /results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});