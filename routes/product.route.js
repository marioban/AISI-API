const express = require("express");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, serializeExample } = require('../controllers/product.controller.js');
const router = express.Router();

router.get('/', getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Define the serialization example route
router.get("/serialize/example", serializeExample);

module.exports = router;
