# Product Management API

This API provides functionality for user authentication and product management. It uses MongoDB for data storage, JWT for authentication, and ActiveMQ for messaging.

## Table of Contents

- [Product Management API](#product-management-api)
  - [Table of Contents](#table-of-contents)
  - [Key Components](#key-components)
  - [Endpoints](#endpoints)
    - [User Authentication](#user-authentication)
      - [Register](#register)
      - [Login](#login)
      - [Token](#token)
      - [Logout](#logout)
    - [Product Management](#product-management)
      - [User Endpoints](#user-endpoints)
        - [Get All Products](#get-all-products)
        - [Get Product by ID](#get-product-by-id)
      - [Admin Endpoints](#admin-endpoints)
        - [Create Product](#create-product)
        - [Update Product](#update-product)
        - [Delete Product](#delete-product)
    - [Serialization Example](#serialization-example)
  - [Middleware](#middleware)
  - [Messaging](#messaging)
  - [Using the API with Postman](#using-the-api-with-postman)
    - [Step 1: Register a User](#step-1-register-a-user)
    - [Step 2: Login to Get Access and Refresh Tokens](#step-2-login-to-get-access-and-refresh-tokens)
    - [Step 3: Use Access Token to Access Protected Routes](#step-3-use-access-token-to-access-protected-routes)
    - [Step 4: Refresh Access Token](#step-4-refresh-access-token)
    - [Step 5: Logout](#step-5-logout)
  - [Admin vs User](#admin-vs-user)
    - [User Endpoints](#user-endpoints-1)
    - [Admin Endpoints](#admin-endpoints-1)
  - [Additional Information](#additional-information)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
  - [Contributing](#contributing)
  - [License](#license)

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
    "password": "password123",
    "role": "user" // or "admin"
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

#### User Endpoints

These endpoints are accessible by both admin and regular users.

##### Get All Products

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

##### Get Product by ID

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

#### Admin Endpoints

These endpoints are accessible only by admin users.

##### Create Product

- **URL**: `/api/products`
- **Method**: POST
- **Protected**: Yes (requires authentication and admin role)
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

##### Update Product

- **URL**: `/api/products/:id`
- **Method**: PUT
- **Protected**: Yes (requires authentication and admin role)
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

##### Delete Product

- **URL**: `/api/products/:id`
- **Method**: DELETE
- **Protected**: Yes (requires authentication and admin role)
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
     "password": "password123",
     "role": "user" // or "admin"
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

## Admin vs User

### User Endpoints

- **GET `/api/products`**: Retrieve all products.
- **GET `/api/products/:id`**: Retrieve a specific product by its ID.

### Admin Endpoints

- **GET `/api/products`**: Retrieve all products.
- **GET `/api/products/:id`**: Retrieve a specific product by its ID.
- **POST `/api/products`**: Create a new product.
- **PUT `/api/products/:id`**: Update an existing product.
- **DELETE `/api/products/:id`**: Delete a product by its ID.

The role assigned to a user during registration determines their level of access within the API. Admin users have full CRUD (Create, Read, Update, Delete) access to the products, while regular users have read-only access.

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
   - `ALLOWED_ORIGINS`
4. Start the server: `node app.js`.
5. Use Postman to test the endpoints as described above.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
```

This README file now includes clear distinctions between the endpoints accessible by users and those accessible by admins, detailing the permissions for each role. It also provides step-by-step instructions for using the API with Postman, as well as setup instructions and other relevant information for developers.
