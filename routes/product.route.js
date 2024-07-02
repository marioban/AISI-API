const express = require("express");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, serializeExample } = require('../controllers/product.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');
const router = express.Router();

// Public routes
router.get('/', authenticateToken, getProducts);
router.get("/:id", authenticateToken, getProduct);

// Admin-only routes
router.post("/", authenticateToken, authorizeRole(['admin']), createProduct);
router.put("/:id", authenticateToken, authorizeRole(['admin']), updateProduct);
router.delete("/:id", authenticateToken, authorizeRole(['admin']), deleteProduct);

// Additional routes
router.get("/serialize/example", serializeExample);

module.exports = router;
