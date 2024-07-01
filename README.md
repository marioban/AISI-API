# Product Management API

This API provides functionality for user authentication and product management. It uses MongoDB for data storage, JWT for authentication, and ActiveMQ for messaging.

## Table of Contents

- [Key Components](#key-components)
- [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
  - [Product Management](#product-management)
  - [Serialization Example](#serialization-example)
- [Middleware](#middleware)
- [Messaging](#messaging)
- [Using the API with Postman](#using-the-api-with-postman)
  - [Step 1: Register a User](#step-1-register-a-user)
  - [Step 2: Login to Get Access and Refresh Tokens](#step-2-login-to-get-access-and-refresh-tokens)
  - [Step 3: Use Access Token to Access Protected Routes](#step-3-use-access-token-to-access-protected-routes)
  - [Step 4: Refresh Access Token](#step-4-refresh-access-token)
  - [Step 5: Logout](#step-5-logout)
- [Additional Information](#additional-information)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)

## Key Components

1. **User Authentication**: Registration, login, token generation, and protected routes.
2. **Product Management**: CRUD operations for products.
3. **Messaging**: Sending messages to an ActiveMQ queue.
4. **Serialization Example**: Safe deserialization and serialization example.
5. **Security**: CORS, Helmet for security, and escape HTML for input safety.

## Endpoints

### User Authentication

#### Register

- **URL**: `/api/auth/register`
- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login

- **URL**: `/api/auth/login`
- **Method**: POST
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "your_jwt_access_token",
    "refreshToken": "your_jwt_refresh_token"
  }
  ```

#### Token

- **URL**: `/api/auth/token`
- **Method**: POST
- **Description**: Refreshes the access token.
- **Request Body**:
  ```json
  {
    "token": "your_jwt_refresh_token"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "new_jwt_access_token"
  }
  ```

#### Logout

- **URL**: `/api/auth/logout`
- **Method**: POST
- **Description**: Logs out a user.
- **Request Body**:
  ```json
  {
    "token": "your_jwt_refresh_token"
  }
  ```
- **Response**: `204 No Content`

### Product Management

#### Get All Products

- **URL**: `/api/products`
- **Method**: GET
- **Protected**: Yes (requires authentication)
- **Description**: Retrieves all products.
- **Response**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Product 1",
      "quantity": 10,
      "price": 99.99,
      "createdAt": "2021-06-23T10:10:10.000Z",
      "updatedAt": "2021-06-23T10:10:10.000Z"
    },
    ...
  ]
  ```

#### Get Product by ID

- **URL**: `/api/products/:id`
- **Method**: GET
- **Protected**: Yes (requires authentication)
- **Description**: Retrieves a product by its ID.
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Product 1",
    "quantity": 10,
    "price": 99.99,
    "createdAt": "2021-06-23T10:10:10.000Z",
    "updatedAt": "2021-06-23T10:10:10.000Z"
  }
  ```

#### Create Product

- **URL**: `/api/products`
- **Method**: POST
- **Protected**: Yes (requires authentication)
- **Description**: Creates a new product.
- **Request Body**:
  ```json
  {
    "name": "Product 1",
    "quantity": 10,
    "price": 99.99
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Product 1",
    "quantity": 10,
    "price": 99.99,
    "createdAt": "2021-06-23T10:10:10.000Z",
    "updatedAt": "2021-06-23T10:10:10.000Z"
  }
  ```

#### Update Product

- **URL**: `/api/products/:id`
- **Method**: PUT
- **Protected**: Yes (requires authentication)
- **Description**: Updates an existing product.
- **Request Body**: Partial or complete update data.
  ```json
  {
    "name": "Updated Product",
    "quantity": 20,
    "price": 199.99
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Updated Product",
    "quantity": 20,
    "price": 199.99,
    "createdAt": "2021-06-23T10:10:10.000Z",
    "updatedAt": "2021-06-23T10:20:20.000Z"
  }
  ```

#### Delete Product

- **URL**: `/api/products/:id`
- **Method**: DELETE
- **Protected**: Yes (requires authentication)
- **Description**: Deletes a product by its ID.
- **Response**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

### Serialization Example

#### Serialization Example

- **URL**: `/api/products/serialize/example`
- **Method**: GET
- **Protected**: No
- **Description**: Demonstrates safe deserialization.
- **Response**:
  ```json
  {
    "serialized": "{\"_class\":\"Product\",\"id\":\"123\",\"name\":\"Example Product\",\"price\":99.99,\"quantity\":10}",
    "deserialized": {
      "_id": "123",
      "name": "Example Product",
      "price": 99.99,
      "quantity": 10
    }
  }
  ```

## Middleware

1. **Authenticate Token**
   - **File**: `middleware/auth.middleware.js`
   - **Description**: Middleware to authenticate JWT tokens.
   - **Usage**: Used in protected routes.

## Messaging

1. **Send Message**
   - **File**: `messaging.js`
   - **Description**: Sends messages to an ActiveMQ queue.

## Using the API with Postman

### Step 1: Register a User

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/auth/register`
3. **Body**: JSON
   ```json
   {
     "username": "user1",
     "password": "password123"
   }
   ```
4. **Send Request**: Click Send.

### Step 2: Login to Get Access and Refresh Tokens

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/auth/login`
3. **Body**: JSON
   ```json
   {
     "username": "user1",
     "password": "password123"
   }
   ```
4. **Send Request**: Click Send.
5. **Save Tokens**: Save the `accessToken` and `refreshToken` from the response.

### Step 3: Use Access Token to Access Protected Routes

1. **Set Authorization Header**
   - **Key**: `Authorization`
   - **Value**: `Bearer YOUR_ACCESS_TOKEN`

2. **Example - Get All Products**
   - **Method**: GET
   - **URL**: `http://localhost:3000/api/products`
   - **Headers**: Add the Authorization header with the access token.
   - **Send Request**: Click Send.

3. **Example - Create a Product**
   - **Method**: POST
   - **URL**: `http://localhost:3000/api/products`
   - **Headers**: Add the Authorization header with the access token.
   - **Body**: JSON
     ```json
     {
       "name": "Product 1",
       "quantity": 10,
       "price": 99.99
     }
     ```
   - **Send Request**: Click Send.

### Step 4: Refresh Access Token

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/auth/token`
3. **Body**: JSON
   ```json
   {
     "token": "YOUR_REFRESH_TOKEN"
   }
   ```
4. **Send Request**: Click Send.
5. **Save New Access Token**: Save the new access token from the response.

### Step 5: Logout

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/auth/logout`
3. **Body**: JSON
   ```json
   {
     "token": "YOUR_REFRESH_TOKEN"
   }
   ```
4. **Send Request**: Click Send.

## Additional Information

- **Database**: MongoDB
- **Authentication**: JWT
- **Messaging**: ActiveMQ
- **Serialization**: Safe deserialization with class validation
- **Security**: Helmet for headers, CORS for cross-origin requests

## Prerequisites

- **Node.js** and **npm**
- **MongoDB** instance
- **ActiveMQ** instance
- **Postman** for testing

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set environment variables in `.env` file:
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `MONGODB_URI`
4. Start the server: `node index.js`.
5. Use Postman to test the endpoints as described above.

This detailed guide should help you understand and interact with the API effectively using Postman. If you have any questions or need further assistance, feel free to ask!
```

Copy and paste the above text into a `README.md` file in your GitHub repository. This will provide a comprehensive guide for users to understand and interact with your API.
