require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Category = require("./models/Category");

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/online-store";

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB for seeding");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Seed categories
const categories = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
];

// Seed products
const products = [
  {
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
    imageUrl: "path/to/smartphone.jpg",
  },
  {
    name: "Laptop",
    price: 1299.99,
    category: "Electronics",
    imageUrl: "path/to/laptop.jpg",
  },
  {
    name: "Novel",
    price: 19.99,
    category: "Books",
    imageUrl: "path/to/novel.jpg",
  },
  {
    name: "T-shirt",
    price: 29.99,
    category: "Clothing",
    imageUrl: "path/to/tshirt.jpg",
  },
];

const seedDB = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});

    const insertedCategories = await Category.insertMany(categories);
    const categoryMap = insertedCategories.reduce((acc, category) => {
      acc[category.name] = category._id;
      return acc;
    }, {});

    const productsWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category], // Replace category name with ObjectId
    }));

    await Product.insertMany(productsWithCategoryIds);
    console.log("Database seeded");
  } catch (error) {
    console.error("Error seeding the database", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
