const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.log("errrr", error);
    res.status(500).json({ message: "Error saving order", error });
  }
});

module.exports = router;
