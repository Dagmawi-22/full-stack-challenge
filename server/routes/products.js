const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  res.json(product);
});

module.exports = router;
