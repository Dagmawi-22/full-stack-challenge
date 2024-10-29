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

const products = [
  {
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
    imageUrl:
      "https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1020&dpr=1&s=none&crop=none",
  },
  {
    name: "Laptop",
    price: 1299.99,
    category: "Electronics",
    imageUrl:
      "https://cdn.thewirecutter.com/wp-content/media/2023/11/editing-laptop-2048px-231551-2x1-1.jpg?width=1024&quality=75&crop=2:1&auto=webp",
  },
  {
    name: "Novel",
    price: 19.99,
    category: "Books",
    imageUrl:
      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  },
  {
    name: "T-shirt",
    price: 29.99,
    category: "Clothing",
    imageUrl:
      "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
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
