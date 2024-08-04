

# Twitter Backend API

## Overview

The Twitter Backend API is a Node.js and Express-based RESTful API designed to support user registration, authentication, and tweet management. It simulates basic Twitter functionality, allowing users to register, log in, post tweets, and view their timelines.
## bash Copy code git clone https://github.com/yourusername/twitter-backend.git cd twitter-backend Install Dependencies

## Features

- **User Registration and Login**: Allows users to register and log in using their credentials.
- **Tweet Management**: Users can post tweets and view their timelines.
- **User Management**: Fetch a list of all users.
- **JWT Authentication**: Secure API endpoints using JSON Web Tokens (JWT).

## Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Node package manager (comes with Node.js)
- **MongoDB**: MongoDB database server (installed and running locally)

### Installation

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/yourusername/twitter-backend.git
   cd twitter-backend
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create a \`.env\` File**

   Create a \`.env\` file in the root directory with the following contents:
   
   \`\`\`
   MONGO_URI=mongodb://localhost:27017/twitter-backend
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   \`\`\`

   - Replace \`your_jwt_secret_key\` with a secure secret key of your choice.

### Running the Application

1. **Start the MongoDB Server**

   Ensure MongoDB is running on your local machine. You can start MongoDB using:
   \`\`\`bash
   mongod
   \`\`\`

2. **Start the API Server**

   To start the server in development mode with automatic restarts on code changes, use:
   \`\`\`bash
   npm run dev
   \`\`\`

   For production mode, use:
   \`\`\`bash
   npm start
   \`\`\`

   The server will be available at \`http://localhost:5001\`.

## API Endpoints

### User Endpoints

#### Register User

- **Endpoint**: \`/api/users/register\`
- **Method**: POST
- **Request Body**:
  \`\`\`json
  {
    "username": "string",
    "password": "string"
  }
  \`\`\`
- **Response**:
  \`\`\`json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "user_id",
      "username": "string"
    }
  }
  \`\`\`
- **Status Codes**:
  - \`201 Created\` for successful registration
  - \`400 Bad Request\` for invalid input

#### Login User

- **Endpoint**: \`/api/users/login\`
- **Method**: POST
- **Request Body**:
  \`\`\`json
  {
    "username": "string",
    "password": "string"
  }
  \`\`\`
- **Response**:
  \`\`\`json
  {
    "token": "jwt_token"
  }
  \`\`\`
- **Status Codes**:
  - \`200 OK\` for successful login
  - \`401 Unauthorized\` for incorrect credentials

#### List All Users

- **Endpoint**: \`/api/all-users\`
- **Method**: GET
- **Headers**:
  \`\`\`
  Authorization: Bearer <token>
  \`\`\`
- **Response**:
  \`\`\`json
  [
    {
      "_id": "user_id",
      "username": "string"
    },
    ...
  ]
  \`\`\`
- **Status Codes**:
  - \`200 OK\` for successful retrieval
  - \`401 Unauthorized\` if the token is missing or invalid

### Tweet Endpoints

#### Post a Tweet

- **Endpoint**: \`/api/tweets\`
- **Method**: POST
- **Request Body**:
  \`\`\`json
  {
    "userId": "string",
    "text": "string"
  }
  \`\`\`
- **Response**:
  \`\`\`json
  {
    "message": "Tweet posted successfully",
    "tweet": {
      "_id": "tweet_id",
      "userId": "user_id",
      "text": "string",
      "createdAt": "timestamp"
    }
  }
  \`\`\`
- **Status Codes**:
  - \`201 Created\` for successful tweet posting
  - \`400 Bad Request\` for invalid input

#### Fetch User's Timeline

- **Endpoint**: \`/api/tweets/user/:userId\`
- **Method**: GET
- **Response**:
  \`\`\`json
  [
    {
      "_id": "tweet_id",
      "userId": "user_id",
      "text": "string",
      "createdAt": "timestamp"
    },
    ...
  ]
  \`\`\`
- **Status Codes**:
  - \`200 OK\` for successful retrieval
  - \`400 Bad Request\` if the userId is missing
  - \`500 Internal Server Error\` for unexpected issues

### Middleware

#### Protect Middleware

- **Purpose**: Secures routes by validating JWT tokens.
- **File**: \`middleware/authMiddleware.js\`
- **Usage**: 
  \`\`\`javascript
  const { protect } = require('./middleware/authMiddleware');
  app.use('/api/tweets', protect, tweetRoutes);
  app.use('/api/all-users', protect, userRoutes);
  \`\`\`

## Error Handling

- **400 Bad Request**: For invalid input or missing parameters.
- **401 Unauthorized**: For invalid or missing JWT tokens.
- **500 Internal Server Error**: For unexpected server errors.

## Testing

Use tools like Postman or cURL to test the API endpoints:

- **Post a Tweet**
  \`\`\`bash
  curl -X POST http://localhost:5001/api/tweets -H "Content-Type: application/json" -d '{"userId": "YOUR_USER_ID", "text": "This is a tweet"}'
  \`\`\`

- **Fetch User's Timeline**
  \`\`\`bash
  curl http://localhost:5001/api/tweets/user/YOUR_USER_ID
  \`\`\`

## Contributing

Feel free to open issues or submit pull requests. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
