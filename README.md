# Bite Swipe App

Bite Swipe is a fullstack application for food voting and suggestions, built with Node.js, React, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development)
- [pnpm](https://pnpm.io/installation) (for frontend package management)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/bite-swipe.git
   cd bite-swipe
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

   ```
   MONGODB_URI=mongodb://mongodb:27017/bite_swipe
   ALLOWED_ORIGINS=http://localhost:4200
   API_URL=http://localhost:3000
   ```

3. Start the application using Docker Compose:

   ```
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

## Development

### Backend

The backend is a Node.js application using Express and MongoDB.

To run the backend separately:

```
cd bite-swipe-backend
npm install
npm run dev
```

### Frontend

The frontend is a Next.js application.

To run the frontend separately:

```
cd bite-swipe-frontend
pnpm install
pnpm run dev
```

## Project Structure

- `bite-swipe-backend/`: Node.js backend
- `bite-swipe-frontend/`: Next.js frontend
- `compose.yml`: Docker Compose configuration

## Security Considerations

1. Environment Variables: Sensitive information is stored in environment variables. Ensure the `.env` file is not committed to version control.

2. CORS: The API uses a configurable CORS policy. Update the `ALLOWED_ORIGINS` environment variable for production.

3. Rate Limiting: The API implements rate limiting to prevent abuse. Adjust the limits in `app.js` as needed.

4. File Uploads: The current implementation stores files locally. Consider using cloud storage for production.

5. Input Validation: Basic input validation is implemented. Consider using a library like Joi for more robust validation.

6. Error Handling: Generic error messages are sent to the client to avoid leaking sensitive information.

7. Helmet: The Express app uses Helmet middleware to set various HTTP headers for security.

## Useful References

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
