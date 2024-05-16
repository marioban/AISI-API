const Product = require('../models/product.model');

const allowedClasses = { Product };

const safeDeserialize = (json) => {
  const parsed = JSON.parse(json);
  if (!parsed?._class || !allowedClasses[parsed._class]) {
    throw new Error("Invalid class");
  }

  const Model = allowedClasses[parsed._class];
  return new Model(parsed);
};

module.exports = safeDeserialize;
