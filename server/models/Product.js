const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: String, required: true },
  imageUrl: String,
});

module.exports = mongoose.model("Product", productSchema);
