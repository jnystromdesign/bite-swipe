const multer = require('multer');
const path = require('path');
const { toKebabCase } = require('./transformers');

// Set up multer for file upload
const _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Make sure this folder exists
    },
    filename: function (req, file, cb) {
      // Parse the JSON data to get the name
      const jsonData = JSON.parse(req.body.json);
      const name = jsonData.name || 'unknown';
      const kebabName = toKebabCase(name);
      
      // Create filename with kebab-cased name, timestamp, and original extension
      cb(null, `${kebabName}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  /**
 * Creates a middleware for handling file uploads from a specific form field.
 * 
 * This function configures multer to handle single file uploads. It uses a custom storage
 * configuration that saves files to the 'uploads/' directory and generates filenames
 * based on the 'name' field from the JSON data in the request body, converted to kebab-case,
 * appended with a timestamp and the original file extension.
 * 
 * @param {string} fieldName - The name of the form field containing the file to be uploaded.
 * 
 * @returns {function} A middleware function that can be used in Express.js routes to handle
 * file uploads.
 * 
 * @throws {Error} If the 'uploads/' directory doesn't exist or isn't writable.
 * @throws {Error} If the request doesn't contain valid JSON data in the 'json' field of the request body.
 * 
 * @example
 * // In your Express.js route definition:
 * app.post('/upload', uploadFileFromFormField('avatar'), (req, res) => {
 *   // req.file contains information about the uploaded file
 *   console.log(req.file);
 *   res.send('File uploaded successfully');
 * });
 * 
 * @note This middleware expects the request to include a 'json' field in the body,
 * containing a JSON object with a 'name' property. This 'name' is used in generating
 * the filename for the uploaded file.
 * 
 * @note Ensure that the 'uploads/' directory exists in your project structure before
 * using this middleware.
 */
  const uploadFileFromFormField = fieldName => { 
    if(!fieldName) throw new Error ('Fieldname must be supplied for uploadFileFromFormField')
    return multer({ storage: _storage }).single(fieldName)
  };

  module.exports = {uploadFileFromFormField}