const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// POST route to add items to the cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body; // Removed userId

    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ productId, quantity });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    const populatedItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          ...item.toObject(),
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
          },
        };
      })
    );
    res.status(200).json(populatedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Cart.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
