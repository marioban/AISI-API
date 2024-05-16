const Product = require('../models/product.model');
const { sendMessage } = require("../messaging");
const safeDeserialize = require('../utils/safeDeserialize');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    await sendMessage("getProducts", { status: "success", data: products });
    res.status(200).json(products);
  } catch (error) {
    await sendMessage("getProducts", { status: "error", message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(mongoose.Types.ObjectId(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    await sendMessage("createProduct", { status: "success", data: product });
    res.status(200).json(product);
  } catch (error) {
    await sendMessage("createProduct", { status: "error", message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      await sendMessage("updateProduct", { status: "not found" });
      return res.status(404).json({ message: "Product not found" });
    }

    await sendMessage("updateProduct", { status: "success", data: product });
    res.status(200).json(product);
  } catch (error) {
    await sendMessage("updateProduct", { status: "error", message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      await sendMessage("deleteProduct", { status: "not found" });
      return res.status(404).json({ message: "Product not found" });
    }

    await sendMessage("deleteProduct", { status: "success", message: "Product deleted successfully" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    await sendMessage("deleteProduct", { status: "error", message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const serializeExample = (req, res) => {
  const product = new Product({
    _class: "Product",
    id: "123",
    name: "Example Product",
    price: 99.99,
    quantity: 10
  });

  // Serialize the product object to JSON
  const serializedProduct = JSON.stringify(product.toObject());

  // Deserialize the JSON back to an object using safe deserialization
  let deserializedProduct;
  try {
    deserializedProduct = safeDeserialize(serializedProduct);
  } catch (error) {
    return res.status(400).json({ message: "Deserialization failed", error: error.message });
  }

  res.json({
    serialized: serializedProduct,
    deserialized: deserializedProduct
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  serializeExample
};
