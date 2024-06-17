
# Node.js API for Product Management

This project implements a Node.js API for managing products with MongoDB as the database, Express.js as the server framework, and ActiveMQ for messaging between components.

## Branches

- **main**: Contains the basic API with CRUD operations for product management.
- **secure-coding**: Includes additional features such as JWT authentication, serialization, and updates for scanning with ZAP, and SonarQube.

## Features

- Full CRUD functionality for product items.
- Integration with MongoDB using Mongoose for data modeling.
- Message logging and event handling through ActiveMQ.
- Structured and validated data entries.
- Secure endpoints with JWT authentication (secure-coding branch).
- Serialization and deserialization protection (secure-coding branch).
- Ready for security scanning with ZAP, Burp Suite, and SonarQube (secure-coding branch).

## Prerequisites

To use this API, you'll need the following installed on your machine:
- Node.js (at least v12.0)
- MongoDB
- ActiveMQ
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuring ActiveMQ

Ensure ActiveMQ is installed and running:
- **Start ActiveMQ with Brew:**
  ```bash
  brew services start activemq
  ```

## Running the Application

To run the application, use the following command:
```bash
npm run dev
```

This will start the server on `http://localhost:3000` and connect to MongoDB and ActiveMQ as configured.

## API Endpoints

### Main Branch

- **GET `/api/products`** - Retrieve all products.
- **GET `/api/products/:id`** - Retrieve a product by its ID.
- **POST `/api/products`** - Add a new product.
- **PUT `/api/products/:id`** - Update an existing product.
- **DELETE `/api/products/:id`** - Remove a product.

### Secure-Coding Branch

- **POST `/api/auth/register`** - Register a new user.
- **POST `/api/auth/login`** - Login and get JWT tokens.
- **POST `/api/auth/token`** - Refresh JWT token.
- **POST `/api/auth/logout`** - Logout and invalidate the refresh token.
- **GET `/api/products/serialize/example`** - Example of serialization and safe deserialization.

## Usage Example

To add a new product via `curl`:

```bash
curl -X POST http://localhost:3000/api/products \
-H 'Content-Type: application/json' \
-d '{"name": "New Product", "quantity": 150, "price": 29.99}'
```

To register a new user via `curl` (secure-coding branch):

```bash
curl -X POST http://localhost:3000/api/auth/register \
-H 'Content-Type: application/json' \
-d '{"username": "testuser", "password": "testpassword"}'
```

## Testing

You can use Postman or similar tools to test the API endpoints. Here are some example requests:

1. **Register a User**:
   - Method: `POST`
   - URL: `http://localhost:3000/api/auth/register`
   - Body: `{"username": "testuser", "password": "testpassword"}`

2. **Login**:
   - Method: `POST`
   - URL: `http://localhost:3000/api/auth/login`
   - Body: `{"username": "testuser", "password": "testpassword"}`
   - Response: `{"accessToken": "yourAccessToken", "refreshToken": "yourRefreshToken"}`

3. **Access Protected Endpoint**:
   - Method: `GET`
   - URL: `http://localhost:3000/api/products`
   - Headers: `Authorization: Bearer yourAccessToken`

4. **Refresh Token**:
   - Method: `POST`
   - URL: `http://localhost:3000/api/auth/token`
   - Body: `{"token": "yourRefreshToken"}`
   - Response: `{"accessToken": "newAccessToken"}`

5. **Logout**:
   - Method: `POST`
   - URL: `http://localhost:3000/api/auth/logout`
   - Body: `{"token": "yourRefreshToken"}`

6. **Serialization Example**:
   - Method: `GET`
   - URL: `http://localhost:3000/api/products/serialize/example`

## Contributing

We welcome contributions to this project. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.
