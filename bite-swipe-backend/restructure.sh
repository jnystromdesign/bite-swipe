#!/bin/bash

# Create new directory structure
mkdir -p src/{config,controllers,models,routes,services,utils,validation}

# Move existing files to their new locations
mv app.js src/
mv db/suggestion.model.js src/models/suggestion.js
mv utils/fileUpload.js src/utils/
mv utils/transformers.js src/utils/

# Create new files
touch src/config/index.js
touch src/controllers/{suggestionController.js,voteController.js}
touch src/routes/{suggestionRoutes.js,voteRoutes.js}
touch src/services/{suggestionService.js,voteService.js}
touch src/validation/suggestionSchema.js
touch src/utils/errorHandler.js
touch server.js

# Move remaining files and folders
mv public src/
mv seed src/

# Clean up empty directories
rm -r db utils

# Output success message
echo "Directory structure has been updated successfully!"
echo "Please review the changes and adjust your code accordingly."
echo "Don't forget to update your Dockerfile if necessary."

# List the new structure
echo "New structure:"
tree -L 3
