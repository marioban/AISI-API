require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');
const productRoute = require("./routes/product.route.js");
const authRoute = require("./routes/auth.route.js");
const { authenticateToken } = require('./middleware/auth.middleware');
const app = express();

app.use(helmet());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Secure CORS configuration
const allowedOrigins = ['https://trusted.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// auth routes
app.use("/api/auth", authRoute);

// protected routes
app.use("/api/products", authenticateToken, productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const escapeHtml = (str) => {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
};

app.get("/echo", (req, res) => {
  const { input } = req.query;
  const safeInput = escapeHtml(input);
  res.send(`<div>${safeInput}</div>`);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the db");
    app.listen(3000, '0.0.0.0', () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
