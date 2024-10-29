const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/online-store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
